"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client ini CUMA dipakai buat Realtime Broadcast channel (pub/sub sesaat),
// bukan buat query tabel langsung. Tabel `amplop` sengaja dikunci rapat via RLS
// (lihat supabase/schema.sql) — semua baca/tulis data lewat API routes di server.
export const supabaseBrowser = createClient(supabaseUrl, anonKey, {
  auth: { persistSession: false },
});
