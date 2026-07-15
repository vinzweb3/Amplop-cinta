import "server-only";
import { createClient } from "@supabase/supabase-js";

// PENTING: file ini cuma boleh diimport dari Route Handler / Server Component.
// Service role key bypass semua RLS policy — jangan pernah bocor ke client bundle.
// Paket "server-only" bakal bikin build error kalau ini kebawa ke client component.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Supabase env vars belum diset. Cek NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di .env.local"
  );
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});
