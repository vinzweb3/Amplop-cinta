export type VibeId = "manis" | "savage" | "misteri";

export const VIBES: { id: VibeId; label: string; emoji: string }[] = [
  { id: "manis", label: "Manis", emoji: "🍯" },
  { id: "savage", label: "Savage", emoji: "😼" },
  { id: "misteri", label: "Misterius", emoji: "🌙" },
];

// 100 kalimat lengkap, tiap baris berdiri sendiri (bukan hasil gabungan
// potongan kalimat). manis 40, savage 30, misteri 30.
export const TEMPLATE_POOLS: Record<VibeId, string[]> = {
  manis: [
    "{nama}, gue kepikiran mulu nulis ini dari kemarin, akhirnya kekumpul juga niatnya.",
    "Oke ini agak deg-degan, tapi gue mau bilang: gue naksir kamu, {nama}.",
    "Random banget ya tiba-tiba gue kirim ini, tapi gue emang udah lama mau ngomong sama kamu, {nama}.",
    "{nama}, kamu tau gak sih tiap kali kamu ketawa gue jadi ikut senyum sendirian.",
    "Gue nggak jago ngerangkai kata romantis, tapi intinya gue suka sama kamu, {nama}.",
    "Entah kenapa nama kamu selalu nyangkut duluan pas gue mikirin siapa yang bikin hari gue enak.",
    "{nama}, boleh nggak gue jujur? Gue udah lama merhatiin kamu diam-diam.",
    "Setiap kali chat kamu masuk, gue selalu buru-buru buka duluan, itu bukan kebetulan.",
    "Kamu itu tipe orang yang bikin gue mikir 'kayaknya asik ya kalau deket sama dia'.",
    "{nama}, ini bukan php, ini beneran gue naksir kamu dari dulu.",
    "Gue nulis ini sambil senyum-senyum sendiri, semoga kamu juga senyum bacanya.",
    "Ada yang beda tiap kali kamu ada di sekitar gue, dan itu kamu, {nama}.",
    "Gue nggak pinter gombal, tapi gue pinter merhatiin kamu, {nama}.",
    "Kalau kamu nanya kenapa gue kirim ini, jawabannya simpel: karena gue suka kamu.",
    "{nama}, gue capek nahan, jadi gue putusin buat ngomong aja langsung.",
    "Kamu salah satu alasan gue semangat buka hp tiap hari, serius.",
    "Gue nggak tau ini bakal jadi apa, tapi gue pengen coba, {nama}.",
    "Ternyata perhatian kecil kamu ke orang lain bikin gue makin yakin sama perasaan ini.",
    "{nama}, kalau kamu baca ini sambil bingung, itu wajar, soalnya gue juga masih bingung ngungkapinnya.",
    "Gue suka caranya kamu perhatian ke hal-hal kecil, itu jarang banget ada di orang lain.",
    "Ini pesan paling jujur yang pernah gue kirim, {nama}.",
    "Kamu tau nggak, tiap kali kamu update status gue selalu buru-buru buka.",
    "Gue nggak butuh alesan panjang buat suka kamu, cukup jadi diri kamu aja udah cukup.",
    "{nama}, gue harap kamu nggak kaget, tapi ini beneran perasaan gue.",
    "Ada momen di mana gue sadar, oh ternyata gue suka sama kamu.",
    "Kamu punya cara sendiri bikin obrolan biasa jadi berkesan, {nama}.",
    "Gue udah coba biasa aja, tapi ternyata susah kalau soal kamu.",
    "{nama}, ini kesempatan gue buat jujur, jadi gue pake.",
    "Kamu salah satu orang yang bikin gue mikir dua kali sebelum bilang 'gue baik-baik aja'.",
    "Gue seneng aja tiap kali nama kamu muncul di notifikasi.",
    "{nama}, jangan kaget kalau tiba-tiba gue jadi rajin nanya kabar kamu.",
    "Gue nulis ini bukan buat maksa kamu suka balik, cuma pengen kamu tau aja.",
    "Kayaknya gue emang beneran suka kamu, {nama}, bukan cuma kagum sesaat.",
    "Kamu tau gak, gue suka banget cara kamu nanggepin hal receh jadi lucu.",
    "{nama}, ini gombalan paling jujur yang bisa gue tulis.",
    "Gue nggak nyangka bakal seserius ini soal perasaan ke kamu.",
    "Ada yang pengen gue omongin, dan itu soal kamu, {nama}.",
    "Kamu bikin gue percaya lagi kalau suka seseorang itu bisa sesimpel ini.",
    "{nama}, gue harap kamu nggak ilfeel, soalnya niat gue baik.",
    "Gue akhirnya berani kirim ini, semoga kamu juga berani baca sampai habis.",
  ],
  savage: [
    "{nama}, gue males php-in orang, jadi gue bilang aja: gue naksir kamu.",
    "Nggak usah lama-lama, {nama}, gue suka kamu, titik.",
    "Gue bukan tipe yang nunggu, jadi gue duluan aja yang ngomong.",
    "{nama}, kalau kamu nolak juga gapapa, minimal gue udah jujur.",
    "Gue nggak butuh drama, cuma butuh jawaban jujur dari kamu.",
    "Jangan kaget, {nama}, ini emang niat gue dari lama.",
    "Gue tipe yang mending ditolak daripada nyesel nggak pernah nyoba.",
    "{nama}, singkat aja: gue suka kamu, kamu gimana?",
    "Gue nggak jago php, jadi gue to the point aja.",
    "Kalau kamu juga suka, bilang aja, jangan digantung kayak status.",
    "{nama}, gue udah capek mikir, jadi gue putusin buat ngomong.",
    "Gue orangnya realistis, kalau suka ya bilang, bukan nunggu kode-kodean.",
    "Nggak ada niat php disini, {nama}, gue emang serius.",
    "Gue males nebak-nebak, jadi gue tanya langsung: mau nggak coba deket sama gue?",
    "{nama}, gue nggak pinter ngerayu, tapi gue jujur.",
    "Daripada mikirin 'gimana kalau', mending gue coba aja langsung.",
    "Gue nggak nuntut apa-apa, cuma pengen kamu tau perasaan gue.",
    "{nama}, ini bukan basa-basi, ini beneran gue naksir kamu.",
    "Gue udah mikir masak-masak, dan jawabannya tetep: gue suka kamu.",
    "Nggak usah php-in gue balik kalau kamu emang nggak suka, oke aja kok.",
    "{nama}, gue orangnya jujur, jadi gue bilang gue naksir kamu duluan.",
    "Gue capek jadi 'temen deket doang', makanya gue ngomong sekarang.",
    "Kalau nanti ditolak, ya gapapa, minimal gue udah coba.",
    "{nama}, gue nggak suka php, makanya gue nggak php-in kamu juga.",
    "Gue nggak nyari alesan buat suka kamu, gue cuma suka aja.",
    "Terserah jawaban kamu apa, gue tetep bakal hargain kejujuran kamu.",
    "{nama}, gue males muter-muter, jadi ini jawaban jujur gue: gue suka kamu.",
    "Gue nggak sempurna, tapi niat gue ke kamu jelas.",
    "Daripada nyesel, mending gue jujur sekarang, {nama}.",
    "Gue cuma butuh satu jawaban, bukan basa-basi panjang.",
  ],
  misteri: [
    "{nama}, amplop ini dikirim diam-diam, tapi isinya beneran jujur.",
    "Ada orang yang udah lama merhatiin kamu dari jauh, {nama}.",
    "Ini bukan pesan iseng, {nama}, ini dari seseorang yang serius.",
    "Kamu nggak tau siapa gue, tapi gue tau kamu cukup baik buat diperhatiin.",
    "{nama}, kalau kamu baca ini, artinya ada yang berani ambil langkah pertama.",
    "Ada rahasia kecil yang akhirnya keluar lewat amplop ini.",
    "Gue sengaja nggak sebut nama, {nama}, biar kamu penasaran dulu.",
    "Kamu sering banget ada di pikiran seseorang, walau kamu nggak sadar.",
    "{nama}, ini bukan prank, ini beneran perasaan orang yang nulis.",
    "Ada yang diam-diam berharap kamu baca amplop ini sampai habis.",
    "Kamu dipilih buat baca ini dari sekian banyak orang, {nama}.",
    "Gue nggak berani sebut nama, tapi gue berani jujur soal perasaan.",
    "{nama}, amplop ini bukan random, ini emang buat kamu.",
    "Ada seseorang yang udah lama nyimpen ini, baru sekarang berani kirim.",
    "Kamu mungkin nggak nyangka, tapi ada yang mikirin kamu diam-diam.",
    "{nama}, ini keberanian seseorang yang akhirnya nemu momennya.",
    "Gue nulis ini tanpa nama, biar kamu fokus ke perasaannya dulu.",
    "Ada yang pengen kamu tau perasaannya, meski caranya nggak biasa.",
    "{nama}, siapa yang nulis ini masih rahasia, tapi perasaannya nyata.",
    "Kamu bikin seseorang susah buat diam aja, {nama}.",
    "Ini bukan pesan biasa, ini dari seseorang yang beneran mikirin kamu.",
    "{nama}, penasaran nggak siapa di balik amplop ini?",
    "Ada yang menunggu momen yang pas, dan momen itu sekarang.",
    "Kamu terpilih buat nerima ini, entah kamu sadar atau nggak.",
    "{nama}, ini rahasia kecil yang akhirnya keluar juga.",
    "Gue nggak nyebut nama biar kamu penasaran lebih dulu, {nama}.",
    "Ada seseorang yang nulis ini dengan hati-hati, biar nggak salah bilang.",
    "{nama}, amplop ini nyampe karena ada niat yang beneran serius.",
    "Kamu nggak sadar seberapa sering kamu muncul di pikiran orang ini.",
    "{nama}, berani lanjut baca sampai identitasnya kebuka?",
  ],
};

export function fillTemplate(raw: string, nama: string): string {
  return raw.replaceAll("{nama}", nama || "kamu");
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickRandomTemplates(vibeId: VibeId, count = 4): string[] {
  return shuffle(TEMPLATE_POOLS[vibeId]).slice(0, count);
}
