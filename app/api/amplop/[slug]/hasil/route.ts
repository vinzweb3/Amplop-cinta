import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Halaman "hasil" creator akses endpoint ini bawa ?key=creator_token.
// Token ini yang jadi "password" tanpa perlu akun/login.
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const key = req.nextUrl.searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Token gak ada" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("amplop")
    .select("dari, ke, vibe, status, balasan, envelope_style, sticker, theme, created_at, opened_at, answered_at, creator_token")
    .eq("slug", params.slug)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Amplop gak ketemu" }, { status: 404 });
  }
  if (data.creator_token !== key) {
    return NextResponse.json({ error: "Token salah" }, { status: 403 });
  }

  const { creator_token, ...publicData } = data;
  return NextResponse.json(publicData);
}
