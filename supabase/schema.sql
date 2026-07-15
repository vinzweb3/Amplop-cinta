-- Amplop Cinta — schema Supabase
-- Jalanin ini di Supabase Dashboard > SQL Editor

create extension if not exists pgcrypto;

create table if not exists amplop (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  creator_token text not null,
  dari text not null,
  ke text not null,
  pesan text not null,
  balasan text,
  vibe text not null check (vibe in ('manis', 'savage', 'misteri')),
  envelope_style text not null default 'klasik' check (envelope_style in ('klasik', 'modern', 'playful')),
  sticker text,
  theme text not null default 'pink' check (theme in ('pink', 'lavender', 'peach', 'mint')),
  status text not null default 'pending' check (status in ('pending', 'terima', 'tolak')),
  support_count integer not null default 0,
  created_at timestamptz not null default now(),
  opened_at timestamptz,
  answered_at timestamptz
);

create index if not exists amplop_slug_idx on amplop (slug);
create index if not exists amplop_wall_idx on amplop (status, answered_at desc) where status = 'terima';

-- RLS diaktifkan tapi SENGAJA TANPA POLICY buat anon/public.
-- Semua baca-tulis wajib lewat API routes Next.js yang pakai service role key
-- (lihat lib/supabase-admin.ts). Ini yang bikin data confession gak bisa
-- di-scan langsung dari browser pakai anon key, walau anon key kebuka di client.
alter table amplop enable row level security;

-- (Opsional) kalau nanti mau buka akses langsung dari client tanpa API route,
-- baru tambahin policy spesifik di sini. Untuk MVP ini, biarkan kosong.

-- Auto-expire amplop yang udah lama biar gak numpuk / privasi lebih aman.
-- Jalanin manual, atau jadwalin lewat Supabase Cron / Edge Function (pg_cron).
-- delete from amplop where created_at < now() - interval '30 days';

-- Migrasi buat yang udah pernah jalanin versi schema lama:
-- alter table amplop add column if not exists balasan text;
-- alter table amplop add column if not exists envelope_style text not null default 'klasik';
-- alter table amplop add column if not exists sticker text;
-- alter table amplop add column if not exists theme text not null default 'pink';
-- alter table amplop add column if not exists support_count integer not null default 0;
