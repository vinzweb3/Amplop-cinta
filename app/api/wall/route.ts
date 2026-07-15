import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Cuma nama, vibe, & support_count yang publik. Pesan pribadi & balasan TIDAK PERNAH ditampilin di sini.
export async function GET() {
  const { data: recent, error: recentError } = await supabaseAdmin
    .from("amplop")
    .select("slug, dari, ke, vibe, answered_at")
    .eq("status", "terima")
    .order("answered_at", { ascending: false })
    .limit(20);

  const { data: top, error: topError } = await supabaseAdmin
    .from("amplop")
    .select("slug, dari, ke, support_count")
    .eq("status", "terima")
    .order("support_count", { ascending: false })
    .order("answered_at", { ascending: false })
    .limit(10);

  if (recentError || topError) {
    console.error(recentError || topError);
    return NextResponse.json({ error: "Gagal ambil data" }, { status: 500 });
  }

  return NextResponse.json({ recent: recent ?? [], top: top ?? [] });
}
