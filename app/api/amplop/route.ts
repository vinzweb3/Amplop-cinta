import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { containsBadWord } from "@/lib/badwords";

const MIN_NAME_LEN = 3;

function makeSlug(nama: string) {
  const base =
    nama
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "")
      .slice(0, 20) || "kamu";
  const suffix = randomBytes(3).toString("hex");
  return `${base}-${suffix}`;
}

function makeToken() {
  return randomBytes(16).toString("hex");
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Body gak valid" }, { status: 400 });

  const { dari, ke, pesan, vibe, envelopeStyle, sticker, theme } = body as {
    dari?: string;
    ke?: string;
    pesan?: string;
    vibe?: string;
    envelopeStyle?: string;
    sticker?: string | null;
    theme?: string;
  };

  if (!dari?.trim() || !ke?.trim() || !pesan?.trim()) {
    return NextResponse.json({ error: "Nama kamu, buat siapa, dan pesan wajib diisi" }, { status: 400 });
  }
  if (dari.trim().length < MIN_NAME_LEN || ke.trim().length < MIN_NAME_LEN) {
    return NextResponse.json({ error: "Nama minimal 3 huruf ya" }, { status: 400 });
  }
  if (!["manis", "savage", "misteri"].includes(vibe ?? "")) {
    return NextResponse.json({ error: "Vibe gak valid" }, { status: 400 });
  }
  if (!["klasik", "modern", "playful"].includes(envelopeStyle ?? "klasik")) {
    return NextResponse.json({ error: "Gaya amplop gak valid" }, { status: 400 });
  }
  if (!["pink", "lavender", "peach", "mint"].includes(theme ?? "pink")) {
    return NextResponse.json({ error: "Tema gak valid" }, { status: 400 });
  }
  if (dari.length > 60 || ke.length > 60 || pesan.length > 300) {
    return NextResponse.json({ error: "Isian kepanjangan" }, { status: 400 });
  }
  if (containsBadWord(dari) || containsBadWord(ke)) {
    return NextResponse.json({ error: "Anda tidak bisa menggunakan kata-kata terlarang" }, { status: 400 });
  }
  if (containsBadWord(pesan)) {
    return NextResponse.json({ error: "Pesan rahasia mengandung kata terlarang" }, { status: 400 });
  }

  const slug = makeSlug(ke);
  const creatorToken = makeToken();

  const { error } = await supabaseAdmin.from("amplop").insert({
    slug,
    creator_token: creatorToken,
    dari: dari.trim(),
    ke: ke.trim(),
    pesan: pesan.trim(),
    vibe,
    envelope_style: envelopeStyle || "klasik",
    sticker: sticker || null,
    theme: theme || "pink",
    status: "pending",
  });

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal bikin amplop, coba lagi" }, { status: 500 });
  }

  return NextResponse.json({ slug, creatorToken });
}
