export type VibeId = "manis" | "savage" | "misteri";

export const VIBES: { id: VibeId; label: string; emoji: string }[] = [
  { id: "manis", label: "Manis", emoji: "🍯" },
  { id: "savage", label: "Savage", emoji: "😼" },
  { id: "misteri", label: "Misterius", emoji: "🌙" },
];

type VibeData = {
  openers: string[];
  middles: string[];
  closers: string[];
  tone: string[];
};

const VIBE_DATA: Record<VibeId, VibeData> = {
  manis: {
    openers: [
      "Halo {nama}, ada hal yang udah lama pengen gue omongin ke kamu.",
      "{nama}, entah dari kapan, tapi kamu selalu berhasil bikin hari gue lebih hangat.",
      "Gue bukan orang yang gampang jatuh hati, tapi kamu beda, {nama}.",
      "{nama}, gue nulis ini dengan hati yang deg-degan, tapi jujur.",
      "Ada satu nama yang selalu muncul di kepala gue akhir-akhir ini, dan itu kamu, {nama}.",
    ],
    middles: [
      "Cara kamu peduli sama hal-hal kecil bikin gue makin yakin sama perasaan ini.",
      "Setiap ketawa kamu tuh kayak jadi alasan gue buat semangat lagi.",
      "Gue gak butuh alasan besar, cukup kehadiran kamu aja udah bikin gue tenang.",
      "Gue pengen jadi orang yang selalu ada buat kamu, kalau kamu izinin.",
      "Semakin gue kenal kamu, semakin gue yakin ini bukan sekadar kagum biasa.",
    ],
    closers: [
      "Boleh gak gue jaga perasaan ini bareng kamu, pelan-pelan?",
      "Mau gak kasih kesempatan buat kita saling kenal lebih dalam?",
      "Kalau kamu mau, gue janji bakal coba jadi yang terbaik buat kamu.",
    ],
    tone: ["🍯", "❤️", "🌸", "🤍", "✨"],
  },
  savage: {
    openers: [
      "{nama}, gue bukan tipe yang suka nyimpen perasaan lama-lama.",
      "Gak mau muter-muter, {nama}, gue mau jujur aja.",
      "{nama}, gue emang jarang serius soal perasaan, tapi kali ini beda.",
      "Ini bukan gombalan, {nama}, ini beneran dari hati.",
      "{nama}, daripada nyesel gara-gara gak pernah ngomong, mending gue bilang sekarang.",
    ],
    middles: [
      "Gue naksir kamu, dan gue cukup yakin buat bilang itu langsung.",
      "Gue tau ada resiko, tapi gue lebih milih jujur daripada nyesel.",
      "Kalau kamu ngerasa hal yang sama, gue siap serius buat kamu.",
      "Gue gak sempurna, tapi niat gue buat kamu tulus.",
      "Gue capek mendem perasaan sendiri, jadi gue pilih terus terang.",
    ],
    closers: [
      "Jadi, {nama}, mau gak coba jalanin ini bareng-bareng?",
      "Apapun jawaban kamu, gue tetep hargain kejujuran kamu.",
      "Cuma butuh satu jawaban jujur dari kamu.",
    ],
    tone: ["🔥", "😼", "🖤", "💬", "✨"],
  },
  misteri: {
    openers: [
      "{nama}, ada seseorang yang diam-diam berharap kamu baca ini.",
      "Amplop ini dikirim oleh orang yang udah lama menyimpan rasa buat kamu, {nama}.",
      "{nama}, gue sengaja gak sebut nama biar kamu penasaran, tapi rasanya nyata.",
      "Ada rahasia kecil yang akhirnya berani keluar lewat amplop ini, {nama}.",
      "{nama}, dari sekian banyak orang, kamu yang dipilih buat baca ini.",
    ],
    middles: [
      "Perasaan ini udah lama disimpan, cuma baru sekarang cukup berani buat diungkap.",
      "Kamu mungkin gak sadar, tapi kamu sering banget ada di pikiran seseorang.",
      "Ini bukan sekadar iseng, ini keberanian yang akhirnya nemu momennya.",
      "Ada yang pengen kamu tau perasaannya, walau lewat cara yang gak biasa.",
      "Sesuatu tentang kamu bikin seseorang susah buat diam aja.",
    ],
    closers: [
      "Penasaran siapa yang nulis ini buat kamu?",
      "Mau tau lebih jauh soal perasaan ini?",
      "Berani buka amplop ini sampai akhir?",
    ],
    tone: ["🌙", "🖤", "✨", "🕯️", "🔑"],
  },
};

function buildPool(vibeId: VibeId): string[] {
  const d = VIBE_DATA[vibeId];
  const list: string[] = [];
  d.openers.forEach((op, oi) => {
    d.middles.forEach((mid, mi) => {
      d.closers.forEach((cl, ci) => {
        const emoji = d.tone[(oi + mi + ci) % d.tone.length];
        list.push(`${op} ${mid} ${cl} ${emoji}`);
      });
    });
  });
  return list;
}

// 5 opener x 5 middle x 3 closer x 3 vibe = 225 kombinasi unik
export const TEMPLATE_POOLS: Record<VibeId, string[]> = {
  manis: buildPool("manis"),
  savage: buildPool("savage"),
  misteri: buildPool("misteri"),
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
