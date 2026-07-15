import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const SUPPORT_COOKIE = "amplop_support";
const DAILY_LIMIT = 10;

type SupportCookieState = { date: string; supported: string[] };

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function readState(req: NextRequest): SupportCookieState {
  const raw = req.cookies.get(SUPPORT_COOKIE)?.value;
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as SupportCookieState;
      if (parsed.date === todayKey()) return parsed;
    } catch {}
  }
  return { date: todayKey(), supported: [] };
}

// POST { slug } — kasih 1 support ke amplop itu. Max 10 amplop berbeda per hari per browser.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const slug = body?.slug;
  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "Slug wajib diisi" }, { status: 400 });
  }

  const state = readState(req);
  if (state.supported.includes(slug)) {
    return NextResponse.json({ error: "Kamu udah kasih support ke amplop ini" }, { status: 409 });
  }
  if (state.supported.length >= DAILY_LIMIT) {
    return NextResponse.json({ error: "Kuota support hari ini abis, besok lagi ya" }, { status: 429 });
  }

  const { data: current } = await supabaseAdmin.from("amplop").select("support_count").eq("slug", slug).single();
  if (!current) {
    return NextResponse.json({ error: "Amplop gak ketemu" }, { status: 404 });
  }

  const { error } = await supabaseAdmin
    .from("amplop")
    .update({ support_count: (current.support_count ?? 0) + 1 })
    .eq("slug", slug);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal kasih support" }, { status: 500 });
  }

  const nextState: SupportCookieState = { date: state.date, supported: [...state.supported, slug] };
  const res = NextResponse.json({ ok: true, remaining: DAILY_LIMIT - nextState.supported.length });
  res.cookies.set(SUPPORT_COOKIE, JSON.stringify(nextState), {
    maxAge: 60 * 60 * 24,
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });
  return res;
}

// GET — cek sisa kuota & daftar slug yang udah di-support hari ini
export async function GET(req: NextRequest) {
  const state = readState(req);
  return NextResponse.json({ remaining: DAILY_LIMIT - state.supported.length, supported: state.supported });
}
