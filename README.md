# Amplop Cinta 💌

Web nembak/nyatain cinta ala Gen Z. Bikin amplop tersegel dengan gaya & tema pilihan sendiri, kirim link ke gebetan, dia buka lewat animasi amplop yang bisa disentuh, jawab, dan kamu tau hasilnya real-time — lengkap dengan perayaan confetti, musik, kartu kenangan, dan leaderboard komunitas.

## Stack
- Next.js 14 (App Router) + TypeScript
- CSS custom (bukan Tailwind utility) — dijaga biar identik pixel-by-pixel sama preview yang udah di-approve
- Supabase (Postgres + Realtime Broadcast)
- Tone.js (musik chime perayaan)
- Deploy: Vercel

## Struktur penting
```
app/
  page.tsx                     -> landing (counter animasi, spotlight pasangan, CTA)
  buat/page.tsx                -> form: nama, vibe, gaya amplop, stiker, tema, template, preview live
  amplop/[slug]/page.tsx       -> halaman penerima: buka amplop, kutipan, Terima/Tolak, balasan, confetti, simpan gambar
  hasil/[slug]/page.tsx        -> halaman creator: status real-time, share WA/X, leaderboard, simpan gambar
  diterima/page.tsx            -> Wall of Love + Top 10 + tombol Support
  api/amplop/route.ts          -> POST bikin amplop baru
  api/amplop/[slug]/route.ts   -> GET data publik, PATCH jawaban + balasan
  api/amplop/[slug]/hasil/route.ts -> GET data buat creator (pakai token)
  api/wall/route.ts            -> GET feed publik + leaderboard support
  api/support/route.ts         -> POST kasih support (limit 10/hari/browser)
lib/
  templates.ts   -> 225 kalimat pengakuan (opener x middle x closer x vibe)
  copy.ts        -> 200 kutipan motivasi, 20 tap-hint, 100 caption share, 70 headline "diterima",
                    50 pesan "plot twist", gaya amplop, stiker, tema warna, smart-suggest
  badwords.ts    -> filter kata terlarang (list ketat, kata kasar ringan dibiarkan)
  save-card.ts   -> generator kartu "Simpan sebagai Gambar" (canvas, 9:16)
  chime.ts       -> musik perayaan pakai Tone.js
  supabase-admin.ts / supabase-browser.ts
components/
  visuals.tsx           -> RibbonSeal (3 varian), FallLayer, BurstHearts, RankBadge, dll
  save-moment-modal.tsx -> modal simpan gambar (long-press buat iOS)
supabase/schema.sql     -> jalanin di SQL Editor Supabase
```

## Fitur lengkap yang ada di versi ini

- **Personalisasi amplop** — pilih Vibe (Manis/Savage/Misterius), Gaya amplop (Klasik/Modern/Playful), Stiker mood, Tema warna (Pink/Lavender/Peach/Mint), dengan smart-suggest otomatis & live preview
- **225 template pesan romantis** + **50 kutipan penutup form**, semua bisa "acak lagi"
- **Filter kata terlarang** — daftar ketat (kata vulgar eksplisit), kata kasar ringan dibiarkan lewat; validasi client + server
- **Nama minimal 3 huruf**, validasi client + server
- **Halaman penerima interaktif**: animasi buka amplop, 200 kutipan motivasi bisa di-swipe dengan 20 variasi tap-hint, kartu reveal bertema
- **Terima**: pulse + confetti + musik chime + 70 variasi kalimat perayaan + wajib balas pesan (5 quick-reply + custom)
- **Tolak berjenjang**: "Nanti dulu ya" → 4 tahap → plot twist "Ya, aku siap!" dengan 50 variasi pesan akhir
- **Simpan sebagai Gambar** — generate kartu ucapan PNG (rasio 9:16, siap buat IG Story), modal long-press (karena iOS Safari ignore atribut `download`)
- **Wall of Love + Top 10 + Support** — leaderboard publik, tombol Support (limit 10/hari/browser), ghost placeholder pas masih kosong
- **Share WhatsApp/X** — teks acak dari 100 variasi caption, real clipboard copy
- **Cegah bikin amplop 2x** — cookie-based (best-effort)
- **Realtime status** — Supabase Broadcast, gak expose tabel ke anon key

## Setup lokal

1. Install dependencies
   ```bash
   npm install
   ```

2. Bikin project di [supabase.com](https://supabase.com), lalu di **SQL Editor** jalanin isi `supabase/schema.sql`.

3. Copy env template dan isi dari **Project Settings > API**:
   ```bash
   cp .env.local.example .env.local
   ```
   - `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY` — aman dipublish ke client
   - `SUPABASE_SERVICE_ROLE_KEY` — **rahasia**, cuma dipakai server-side, jangan commit

4. Jalanin dev server
   ```bash
   npm run dev
   ```

## Deploy ke Vercel

1. Push project ini ke GitHub repo baru.
2. Buka [vercel.com/new](https://vercel.com/new), import repo itu.
3. Di step **Environment Variables**, masukin 3 variable dari `.env.local` kamu.
4. Deploy. Kalau mau domain `dearyou.vercel.app`, atur di **Project Settings → Domains** (atau kasih nama project `dearyou` pas import, biar domain default-nya udah itu).

## Cara kerja tanpa login

- Tiap amplop punya `slug` (buat dikirim ke target) dan `creator_token` (rahasia, nyempil di URL hasil sebagai `?key=...`), mirip prinsip "siapa yang punya link Google Docs bisa akses".
- Update real-time pakai **Supabase Realtime Broadcast**, jadi tabel `amplop` gak perlu dibuka lewat RLS ke anon key sama sekali — semua baca/tulis lewat API routes yang pakai service role key di server.
- Support & cegah-bikin-2x pakai cookie per-browser — best-effort, bukan proteksi kuat.

## Yang perlu kamu putusin sebelum share ke publik

- **Retensi data**: link gak ada expiry default. Ada query contoh di `schema.sql` buat hapus amplop lama.
- **Rate limiting create-amplop & support** cuma cookie-based — incognito/clear cookies bisa bypass. Kalau butuh lebih kuat, pertimbangin OTP nomor HP.
- **Musik chime (Tone.js)** butuh dynamic import biar gak nge-bloat bundle size initial load — sudah diimplementasi begitu di `lib/chime.ts`.
