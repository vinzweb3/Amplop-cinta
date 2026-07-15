import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { containsBadWord } from "@/lib/badwords";

// GET: data publik buat halaman penerima. creator_token TIDAK PERNAH dikirim ke sini.
export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  const { data, error } = await supabaseAdmin
    .from("amplop")
    .select("dari, ke, pesan, vibe, status, balasan, envelope_style, sticker, theme, opened_at")
    .eq("slug", params.slug)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Amplop gak ketemu" }, { status: 404 });
  }

  if (!data.opened_at) {
    await supabaseAdmin.from("amplop").update({ opened_at: new Date().toISOString() }).eq("slug", params.slug);
  }

  return NextResponse.json(data);
}

// PATCH: penerima kirim jawaban + balasan pesan. Sekali dijawab, dikunci.
export async function PATCH(req: NextRequest, { params }: { params: { slug: string } }) {
  const body = await req.json().catch(() => null);
  const answer = body?.answer;
  const balasan = typeof body?.balasan === "string" ? body.balasan.trim() : "";

  if (answer !== "terima" && answer !== "tolak") {
    return NextResponse.json({ error: "Jawaban gak valid" }, { status: 400 });
  }
  if (!balasan) {
    return NextResponse.json({ error: "Balasan pesan wajib diisi" }, { status: 400 });
  }
  if (balasan.length > 500) {
    return NextResponse.json({ error: "Balasan kepanjangan" }, { status: 400 });
  }
  if (containsBadWord(balasan)) {
    return NextResponse.json({ error: "Balasan mengandung kata terlarang" }, { status: 400 });
  }

  const { data: existing } = await supabaseAdmin.from("amplop").select("status").eq("slug", params.slug).single();

  if (!existing) {
    return NextResponse.json({ error: "Amplop gak ketemu" }, { status: 404 });
  }
  if (existing.status !== "pending") {
    return NextResponse.json({ error: "Amplop ini udah dijawab sebelumnya" }, { status: 409 });
  }

  const { error } = await supabaseAdmin
    .from("amplop")
    .update({ status: answer, balasan, answered_at: new Date().toISOString() })
    .eq("slug", params.slug);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal nyimpen jawaban" }, { status: 500 });
  }

  // Notify real-time ke halaman "hasil" creator kalau lagi kebuka (best-effort)
  await supabaseAdmin.channel(`amplop:${params.slug}`).send({
    type: "broadcast",
    event: "answered",
    payload: { status: answer, balasan },
  });

  return NextResponse.json({ ok: true, status: answer });
}
