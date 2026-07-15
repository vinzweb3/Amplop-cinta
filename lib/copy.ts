import type { VibeId } from "./templates";

// ---- 200 kata-kata motivasi (ditampilin di layar amplop tertutup, bisa di-swipe) ----
const QUOTE_A = [
  "Sebuah pesan yang dikirim khusus untuk membuat harimu lebih bermakna.",
  "Cinta yang tulus selalu punya cara untuk sampai ke tujuan, termasuk ke hatimu saat ini.",
  "Satu sentuhan kecil bisa membuka segudang perasaan yang ingin disampaikan.",
  "Kadang, satu pesan sederhana adalah alasan seseorang merasa berarti hari ini.",
  "Jangan biarkan rasa penasaranmu tertunda, kebahagiaan kecil sedang menunggu di dalam.",
  "Setiap amplop yang terkirim membawa keberanian dari seseorang yang jujur sama perasaannya.",
  "Perasaan yang tulus gak butuh kata-kata mewah, cukup keberanian buat diungkapkan.",
  "Ada momen di mana diam bukan lagi pilihan, dan hari ini adalah momen itu.",
  "Rasa yang dipendam terlalu lama akhirnya nemu caranya buat keluar.",
  "Kata-kata sederhana kadang punya kekuatan buat mengubah satu hari penuh.",
  "Sesuatu yang tulus selalu terasa berbeda, bahkan lewat amplop digital sekalipun.",
  "Keberanian buat jujur soal perasaan itu sendiri udah jadi bentuk cinta.",
  "Gak semua perasaan harus ditahan, kadang dia cuma butuh ruang buat diucapkan.",
  "Hari ini, seseorang memilih buat berhenti diam dan mulai jujur.",
  "Perasaan yang dijaga baik-baik akhirnya nemu waktu yang tepat buat dibagikan.",
  "Cinta yang jujur gak pernah datang di waktu yang salah.",
  "Setiap amplop nyimpen keberanian yang gak semua orang punya.",
  "Kadang yang dibutuhkan cuma satu langkah kecil buat mulai sesuatu yang besar.",
  "Perasaan tulus itu jarang salah tempat, walau sering telat diucapkan.",
  "Momen sederhana kayak ini bisa jadi awal dari cerita yang panjang.",
];
const QUOTE_B = [
  "Buka amplopnya, dan biarkan hati kamu yang jawab.",
  "Baca pelan-pelan, siapa tau ini yang selama ini kamu tunggu.",
  "Beranikan diri buka, siapa tau ini awal dari sesuatu yang indah.",
  "Satu klik lagi, dan kamu bakal tau siapa yang mikirin kamu.",
  "Jangan di-skip, mungkin ini pesan yang kamu butuhkan hari ini.",
  "Buka sekarang, biar rasa penasaran kamu langsung terjawab.",
  "Klik amplopnya, dan sambut apa yang udah lama dipendam buat kamu.",
  "Coba buka, siapa tau harimu berubah jadi lebih baik.",
  "Amplop ini nungguin kamu buat dibuka, pelan-pelan aja.",
  "Rasain sendiri, kadang hal kecil kayak ini yang paling berkesan.",
];
export const QUOTE_POOL: string[] = [];
QUOTE_A.forEach((a) => QUOTE_B.forEach((b) => QUOTE_POOL.push(`${a} ${b}`)));

// ---- 50 kutipan singkat pengantar nulis pesan ----
export const WRITE_QUOTES = [
  "Pesan tulus bikin segalanya lebih mudah. ✨",
  "Berani jujur, berani bahagia. 💌",
  "Semoga pesannya tersampaikan dengan manis. 🍯",
  "Satu pesan, sejuta rasa. Pilih yang pas! 💫",
  "Kata-kata sederhana, dampaknya bisa luar biasa. 🌸",
  "Jujur itu simpel, cuma butuh berani. 🤍",
  "Pesan yang tulus selalu nemu jalannya. 🕊️",
  "Satu kalimat bisa mulai banyak cerita. 📖",
  "Gak perlu sempurna, cukup jujur. 💗",
  "Rasa yang tulus gak pernah salah kata. 🌷",
  "Kadang, kata sederhana paling berkesan. ✨",
  "Pilih yang paling mewakili hati kamu. 💓",
  "Semua kata baik, tinggal pilih yang paling kamu. 🍯",
  "Ketulusan gak butuh kata mewah. 🤍",
  "Satu pesan bisa ubah satu hari. 🌤️",
  "Berani kirim, berani lega. 💌",
  "Pesan singkat, makna panjang. 📝",
  "Yang penting jujur, bukan sempurna. 🌸",
  "Kata yang tulus selalu ngena. 💫",
  "Pilih kata yang bikin kamu nyaman. 🤍",
  "Semoga pesan ini bikin harinya lebih baik. ☀️",
  "Cukup jujur, itu udah cukup indah. 💗",
  "Satu kalimat, satu keberanian. ✨",
  "Kata yang tulus gak pernah telat. 🕰️",
  "Pesan baik selalu punya tempat di hati. 🌷",
  "Gak usah muluk, yang penting dari hati. 🤍",
  "Pilih kata yang bikin kamu pede kirimnya. 💌",
  "Ketulusan itu bahasa universal. 🌍",
  "Satu pesan bisa jadi awal yang indah. 🌸",
  "Kata jujur selalu punya kekuatannya sendiri. 💫",
  "Semoga kata-katanya sampai ke hati yang tepat. 💓",
  "Gak perlu panjang, yang penting tulus. 📝",
  "Pesan kecil, dampak besar. ✨",
  "Jujur aja, itu udah lebih dari cukup. 🤍",
  "Kata yang tepat bikin hati tenang. 🕊️",
  "Satu pesan, satu langkah berani. 💌",
  "Semoga ini jadi kata yang pas buat kamu. 🍯",
  "Ketulusan selalu punya cara buat sampai. ✨",
  "Pilih yang paling jujur, bukan paling keren. 🤍",
  "Kata sederhana, rasa yang dalam. 💗",
  "Semoga pesan ini bawa kabar baik. 🌤️",
  "Satu pesan tulus bisa ubah banyak hal. 💫",
  "Jangan takut kata-katamu kurang sempurna. 🌸",
  "Yang tulus, biasanya yang paling diinget. 🤍",
  "Kata jujur gak pernah butuh polesan. ✨",
  "Pilih kata yang bikin kamu lega ngirimnya. 💌",
  "Semoga pesan ini ditunggu-tunggu. 🕊️",
  "Satu kalimat bisa mulai cerita baru. 📖",
  "Ketulusan itu yang bikin pesan berarti. 💓",
  "Semoga kata-katanya nyampe dengan pas. 🍯",
];

// ---- 20 variasi teks "tap buat buka amplop" ----
export const TAP_HINTS = [
  "Tap buat buka amplopnya ✨",
  "Sentuh amplopnya, ada pesan buat kamu",
  "Tap untuk intip isinya...",
  "Psst, amplopnya nungguin dibuka",
  "Satu tap lagi menuju rahasia di dalam",
  "Buka pelan-pelan, ada kejutan di dalamnya",
  "Amplopnya kebuka kalau kamu berani tap",
  "Ketuk amplopnya, jangan malu-malu",
  "Ada yang nitip pesan, tap buat baca",
  "Rasa penasaran kamu berakhir di satu tap ini",
  "Tap sini buat tau siapa yang mikirin kamu",
  "Isinya nunggu dari tadi, tap yuk",
  "Sentuh, dan biarkan pesannya bicara",
  "Satu ketukan, sejuta kemungkinan",
  "Amplop ini gak gigit, tap aja",
  "Buka amplopnya, biar gak penasaran",
  "Ada cerita yang nunggu dibuka",
  "Tap buat tau apa yang disegel di sini",
  "Yuk intip, amplopnya udah siap dibuka",
  "Jangan cuma dilihatin, tap dong",
];

// ---- 5 opsi quick-reply penerima ----
export const REPLY_SUGGESTIONS = [
  "Iya, aku juga mau ❤️",
  "Aku juga udah lama naksir kamu 🍯",
  "Yuk kita coba pelan-pelan",
  "Ciee, modus ya? 😆",
  "Hmm, boleh juga nih 😏",
];

// ---- 100 caption share (4 tone x 5 lead x 5 tail) ----
const CAPTION_BANK = {
  misterius: {
    lead: ["Aku punya sesuatu yang rahasia buat kamu.", "Ada amplop misterius yang isinya tentang kamu.", "Psst, ada pesan diam-diam yang nungguin kamu.", "Aku nitip sesuatu yang gak berani aku bilang langsung.", "Ada rahasia kecil yang akhirnya aku berani kirim."],
    tail: ["Berani nggak buka amplop ini? 🤫", "Penasaran gak isinya apa? Buka aja.", "Coba buka, dijamin bikin penasaran.", "Beneran deh, buka aja dulu baru nyesel enggaknya belakangan.", "Amplopnya nungguin buat dibuka, buka sekarang ya."],
  },
  manis: {
    lead: ["Ada perasaan tulus yang aku titipin di amplop ini.", "Aku nulis ini dengan hati yang deg-degan, khusus buat kamu.", "Ini bukan pesan biasa, ini perasaan yang udah lama aku simpen.", "Aku pengen kamu tau perasaan aku, lewat cara yang lebih pelan.", "Amplop ini isinya jujur banget, khusus buat kamu."],
    tail: ["Coba buka deh, khusus buat kamu 💌", "Baca pelan-pelan ya, ini beneran dari hati.", "Semoga kamu suka apa yang aku tulis di dalamnya.", "Buka kapan aja kamu siap, aku nunggu kok.", "Semoga ini bikin hari kamu sedikit lebih hangat."],
  },
  baper: {
    lead: ["Gue naksir sama lo dari dulu, tapi baru berani bilang lewat sini.", "Gue udah capek mendem perasaan sendiri, jadi gue kirim ini.", "Ini bukan basa-basi, gue emang naksir kamu.", "Daripada nyesel gak pernah ngomong, gue pilih kirim amplop ini.", "Gue serius, ini bukan iseng-iseng doang."],
    tail: ["Baca ya, jangan di-php-in balik 🥺", "Jawabannya terserah kamu, tapi gue udah coba jujur.", "Semoga kamu baca sampai habis.", "Gue nunggu jawaban kamu setelah ini.", "Baca pelan-pelan, terus kasih tau jawaban kamu ya."],
  },
  menggoda: {
    lead: ["Jangan di-skip!", "Eh, ada pesan penting buat kamu.", "Stop scroll bentar, ini penting.", "Ada satu hal yang harus kamu tau sekarang.", "Buka ini sebelum kamu lupa."],
    tail: ["Ada pesan penting yang nungguin lo buka sekarang. 💖", "Dijamin bikin kamu senyum-senyum sendiri.", "Buka sekarang juga, jangan nanti-nanti.", "Ini beneran worth it buat dibuka.", "Kamu bakal nyesel kalau nge-skip ini."],
  },
};
export const CAPTION_POOL: string[] = [];
Object.values(CAPTION_BANK).forEach((cat) => cat.lead.forEach((l) => cat.tail.forEach((t) => CAPTION_POOL.push(`${l} ${t}`))));

// ---- 70 variasi headline layar "diterima" ----
const TERIMA_A = [
  "Yay! Akhirnya kita resmi! 💕",
  "Selamat! Kalian resmi jadi sepasang sekarang.",
  "Wah, akhirnya kejadian juga!",
  "Congrats, satu jawaban tadi ngubah semuanya.",
  "Wah, penantian ini akhirnya berbuah manis.",
  "Yes! Ini baru namanya awal yang bagus.",
  "Akhirnya jawabannya iya, dan itu bikin semuanya beda.",
  "Selamat menempuh cerita baru, kalian berdua!",
  "Wah gercep amat sih responnya, tapi seneng banget!",
  "Ini dia momen yang bakal diinget terus.",
];
const TERIMA_BC = [
  "{dari} & {ke} resmi memulai cerita baru dari sini.",
  "Mulai sekarang, {dari} & {ke} punya bab baru buat ditulis bareng.",
  "Selamat datang di chapter baru, {dari} & {ke}.",
  "{dari} & {ke}, semoga cerita ini panjang dan penuh warna.",
  "Catat tanggalnya, {dari} & {ke} baru aja mulai sesuatu yang spesial.",
];
export type TerimaHeadline = { main: string; sub: string };
export const TERIMA_HEADLINES: TerimaHeadline[] = [];
TERIMA_A.forEach((a) => TERIMA_BC.forEach((bc) => TERIMA_HEADLINES.push({ main: a, sub: bc })));
TERIMA_HEADLINES.push(
  { main: "Diterima! 🎉", sub: "Jawabanmu jadi lembar pertama dari cerita yang mau {dari} & {ke} tulis bareng-bareng." },
  { main: "Akhirnya, kita resmi!", sub: "Dunia kayak jadi beda sejak {ke} bilang iya." },
  { main: "Diterima! ✨", sub: "Siap-siap, {dari} & {ke}, karena mulai hari ini, bab baru kalian baru aja dimulai." },
  { main: "Selamat, ini resmi!", sub: "{dari} & {ke} baru aja mulai halaman pertama cerita mereka." },
  { main: "Yes, jawabannya iya!", sub: "Gak perlu nunggu lebih lama, {dari} & {ke} udah resmi sekarang." },
  { main: "Wah, ini beneran kejadian!", sub: "{dari} & {ke}, selamat menempuh hidup baru bareng-bareng." },
  { main: "Congrats, kalian resmi!", sub: "Momen ini layak diinget selamanya, {dari} & {ke}." },
  { main: "Diterima, dan itu manis banget", sub: "{ke} baru aja bikin hari {dari} jadi tak terlupakan." },
  { main: "Ini dia jawaban yang ditunggu", sub: "{dari} & {ke} resmi mulai chapter baru bareng." },
  { main: "Akhirnya, jadi juga!", sub: "Semoga {dari} & {ke} selalu jaga cerita ini baik-baik." },
  { main: "Plot twist manis: diterima!", sub: "{dari} & {ke}, siap-siap bikin banyak cerita baru." },
  { main: "Resmi, sah, gak php lagi!", sub: "{dari} & {ke} mulai dari sekarang." },
  { main: "Ini baru namanya awal yang indah", sub: "{dari} & {ke}, semoga langkah ini membawa banyak kebahagiaan." },
  { main: "Yeay, akhirnya jadian!", sub: "{dari} & {ke} resmi punya cerita sendiri mulai sekarang." },
  { main: "Satu jawaban, sejuta cerita baru", sub: "{dari} & {ke} baru aja mulai sesuatu yang spesial." },
  { main: "Selamat atas jawabannya!", sub: "{dari} & {ke}, semoga ini jadi awal yang selalu dikenang." },
  { main: "Ciee, resmi jadian!", sub: "{dari} & {ke} baru aja upgrade status, congrats!" },
  { main: "Ini momen yang bakal diceritain terus", sub: "{dari} & {ke} resmi mulai babak baru hari ini." },
  { main: "Diterima dengan penuh haru", sub: "{dari} & {ke}, semoga perjalanan ini selalu hangat." },
  { main: "Selamat datang di bab baru", sub: "{dari} & {ke} baru aja menulis halaman pertamanya." }
);

// ---- 50 variasi pesan layar "Ya, aku siap" (plot twist) ----
const SURRENDER_A = [
  "Definisi lega yang sesungguhnya itu pas kamu bilang iya",
  "Definisi bahagia hari ini karena kamu mau kasih kesempatan",
  "Definisi jawaban yang paling ditunggu akhirnya datang darimu",
  "Definisi momen berharga itu saat kamu bilang iya",
  "Definisi tenang itu muncul saat kamu kasih kesempatan",
  "Definisi bahagia yang sederhana, cukup dengan kesempatan yang kamu beri",
  "Definisi lega rasanya seperti ini, pas kamu kasih kesempatan",
  "Definisi awal yang manis dimulai dari kesempatan kamu",
  "Definisi penantian yang berbuah hasil, ada di jawaban kamu barusan",
  "Definisi rasa bahagia yang mendalam pas kamu bilang iya",
];
const SURRENDER_BC = [
  "Terima kasih ya sudah kasih kesempatan, mari pelan-pelan kita jalani semuanya.",
  "Makasih banyak ya, yuk kita mulai buat cerita indah kita dari sini.",
  "Terima kasih ya sudah mau percaya, mari kita jaga perasaan ini supaya tetap indah.",
  "Makasih ya sudah beri kesempatan ini, mari kita tulis cerita-cerita manis ke depannya.",
  "Terima kasih ya sudah mau melangkah bersama, yuk pelan-pelan saja kita jalani semuanya dengan hati.",
];
export const SURRENDER_MESSAGES: string[] = [];
SURRENDER_A.forEach((a) => SURRENDER_BC.forEach((bc) => SURRENDER_MESSAGES.push(`${a}. ${bc}`)));

export const TOLAK_STAGES = ["Nanti dulu ya", "Yakin belum siap?", "Duh, beneran gak mau?", "Kasih kesempatan dong!", "Ya, aku siap!"];

// ---- Gaya amplop, stiker mood, tema warna ----
export type EnvelopeStyleId = "klasik" | "modern" | "playful";
export const ENVELOPE_STYLES: { id: EnvelopeStyleId; label: string; icon: string; desc: string; cardRadius: number; cardBorder: string; sealVariant: "wax" | "flat" | "sticker" }[] = [
  { id: "klasik", label: "Klasik", icon: "🕯️", desc: "segel wax elegan", cardRadius: 26, cardBorder: "1.5px solid #ffc7da", sealVariant: "wax" },
  { id: "modern", label: "Modern", icon: "◻️", desc: "garis bersih & rapi", cardRadius: 14, cardBorder: "1.5px solid #ffc7da", sealVariant: "flat" },
  { id: "playful", label: "Playful", icon: "🎈", desc: "ceria & meriah", cardRadius: 30, cardBorder: "2px dashed #f5487a", sealVariant: "sticker" },
];
export const MOOD_STICKERS = ["😊", "🥰", "🥹", "😳", "🔥", "🌙", "✨", "😼"];

export type ThemeId = "pink" | "lavender" | "peach" | "mint";
export const THEMES: { id: ThemeId; name: string; swatch: string; grad: string; pill: string; pillText: string }[] = [
  { id: "pink", name: "Pink Klasik", swatch: "#f5487a", grad: "linear-gradient(160deg,#fff 0%,#fff5f8 100%)", pill: "#fff6e2", pillText: "#b9822c" },
  { id: "lavender", name: "Lavender", swatch: "#8b7cf6", grad: "linear-gradient(160deg,#fff 0%,#f3f0ff 100%)", pill: "#efeaff", pillText: "#6c5bd1" },
  { id: "peach", name: "Peach", swatch: "#f7935a", grad: "linear-gradient(160deg,#fff 0%,#fff0e6 100%)", pill: "#ffe9d9", pillText: "#c2661f" },
  { id: "mint", name: "Mint", swatch: "#3ec98f", grad: "linear-gradient(160deg,#fff 0%,#eafff5 100%)", pill: "#dcfcee", pillText: "#1f9d6a" },
];
export const VIBE_THEME_MAP: Record<VibeId, ThemeId> = { manis: "pink", savage: "peach", misteri: "lavender" };
export const VIBE_SUGGESTIONS: Record<VibeId, { style: EnvelopeStyleId; sticker: string; note: string }> = {
  manis: { style: "klasik", sticker: "🥰", note: "Vibe Manis paling nyambung sama gaya Klasik + stiker 🥰" },
  savage: { style: "playful", sticker: "😼", note: "Vibe Savage cocok banget sama gaya Playful + stiker 😼" },
  misteri: { style: "modern", sticker: "🌙", note: "Vibe Misterius pas sama gaya Modern + stiker 🌙" },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
export function pickRandomN<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}
export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
export function fillNames(template: string, dari: string, ke: string): string {
  return template.replaceAll("{dari}", dari).replaceAll("{ke}", ke);
}
export function randomCaption(link: string): string {
  return `${pickRandom(CAPTION_POOL)} ${link}`;
}
