// Kebijakan: kata kasar ringan (anjing, babi, dst) dibiarin lewat.
// Yang diblokir cuma kata vulgar/eksplisit di bawah ini.
const STRICT_WORDS = [
  "lonte", "psk", "pepek", "kontol", "idiot", "pelacur", "memek", "penis", "vagina",
  "jembut", "nenen", "payudara", "sange", "sex", "anal", "ngentot", "ngewe", "jilmek", "sepong",
];

export function containsBadWord(text: string): boolean {
  const clean = text.toLowerCase();
  return STRICT_WORDS.some((w) => new RegExp(`\\b${w}\\b`, "i").test(clean));
}

// Catatan: ini filter kata dasar (word-boundary match), bukan solusi lengkap.
// Untuk produksi yang lebih rame, pertimbangin layanan moderasi teks pihak ketiga.
