"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldAlert, Lock } from "lucide-react";
import { VIBES, VibeId, fillTemplate, pickRandomTemplates } from "@/lib/templates";
import { containsBadWord } from "@/lib/badwords";
import {
  WRITE_QUOTES,
  ENVELOPE_STYLES,
  MOOD_STICKERS,
  THEMES,
  VIBE_THEME_MAP,
  VIBE_SUGGESTIONS,
  EnvelopeStyleId,
  ThemeId,
  pickRandom,
} from "@/lib/copy";
import { RibbonSeal } from "@/components/visuals";

const MIN_NAME_LEN = 3;

export default function BuatAmplopPage() {
  const router = useRouter();
  const [dari, setDari] = useState("");
  const [ke, setKe] = useState("");
  const [pesan, setPesan] = useState("");
  const [vibe, setVibe] = useState<VibeId>("manis");
  const [envelopeStyle, setEnvelopeStyle] = useState<EnvelopeStyleId>("klasik");
  const [sticker, setSticker] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeId>("pink");
  const [usingTemplate, setUsingTemplate] = useState(false);
  const [shown, setShown] = useState<string[]>(() => pickRandomTemplates("manis"));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ dari: string; ke: string; pesan: string }>({ dari: "", ke: "", pesan: "" });
  const [pesanFading, setPesanFading] = useState(false);
  const [writeQuote] = useState(() => pickRandom(WRITE_QUOTES));
  const pesanRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = pesanRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  }, [pesan]);

  const namaTarget = ke.trim() || "kamu";

  function validateName(val: string): string {
    if (containsBadWord(val)) return "Nama mengandung kata yang tidak diperbolehkan 🚫";
    if (val.trim().length > 0 && val.trim().length < MIN_NAME_LEN) return "Nama minimal 3 huruf ya";
    return "";
  }

  function updateDari(v: string) {
    setDari(v);
    setFieldErrors((f) => ({ ...f, dari: validateName(v) }));
  }
  function updateKe(v: string) {
    setKe(v);
    setFieldErrors((f) => ({ ...f, ke: validateName(v) }));
  }
  function updatePesan(v: string) {
    setPesan(v);
    setUsingTemplate(false);
    setFieldErrors((f) => ({ ...f, pesan: containsBadWord(v) ? "Pesan rahasia mengandung kata terlarang" : "" }));
  }

  function applyTemplate(raw: string) {
    setPesan(fillTemplate(raw, namaTarget));
    setUsingTemplate(true);
    setFieldErrors((f) => ({ ...f, pesan: "" }));
  }

  function shuffleTemplates() {
    const pool = pickRandomTemplates(vibe);
    setShown(pool);
    if (usingTemplate) {
      setPesanFading(true);
      setTimeout(() => {
        setPesan(fillTemplate(pool[0], namaTarget));
        setPesanFading(false);
      }, 180);
    }
  }

  function changeVibe(next: VibeId) {
    const pool = pickRandomTemplates(next);
    setShown(pool);
    setVibe(next);
    setTheme(VIBE_THEME_MAP[next]);
    if (usingTemplate) setPesan(fillTemplate(pool[0], namaTarget));
  }

  const suggestion = VIBE_SUGGESTIONS[vibe];
  const envStyleObj = ENVELOPE_STYLES.find((s) => s.id === envelopeStyle)!;
  const themeObj = THEMES.find((t) => t.id === theme)!;
  const vibeObj = VIBES.find((v) => v.id === vibe)!;

  async function handleSubmit() {
    if (!dari.trim() || !ke.trim() || !pesan.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/amplop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dari, ke, pesan, vibe, envelopeStyle, sticker, theme }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal bikin amplop");
      router.push(`/hasil/${data.slug}?key=${data.creatorToken}`);
    } catch (e: any) {
      setError(e.message ?? "Ada yang salah, coba lagi");
      setSubmitting(false);
    }
  }

  const canSubmit =
    dari.trim() && ke.trim() && pesan.trim() && !fieldErrors.dari && !fieldErrors.ke && !fieldErrors.pesan;

  return (
    <div className="screen page-anim" style={{ paddingBottom: 40 }}>
      <div className="content">
        <div className="topbar">
          <button className="back" onClick={() => router.push("/")}>
            <ArrowLeft size={17} />
          </button>
          <div className="label">Isi Amplop</div>
        </div>

        <div className="field-wrap">
          <div className="field-label">Nama kamu</div>
          <input className="input" placeholder="cth. Jeshin" value={dari} onChange={(e) => updateDari(e.target.value)} maxLength={60} />
          {fieldErrors.dari && (
            <p className="field-error">
              <ShieldAlert size={12} />
              {fieldErrors.dari}
            </p>
          )}
        </div>

        <div className="field-wrap">
          <div className="field-label">Buat siapa?</div>
          <input className="input" placeholder="cth. Lucia" value={ke} onChange={(e) => updateKe(e.target.value)} maxLength={60} />
          {fieldErrors.ke && (
            <p className="field-error">
              <ShieldAlert size={12} />
              {fieldErrors.ke}
            </p>
          )}
        </div>

        <div className="field-wrap">
          <div className="field-label">Vibe amplop</div>
          <div className="vibe-row">
            {VIBES.map((v) => (
              <button key={v.id} className={`vibe-chip ${vibe === v.id ? "active" : ""}`} onClick={() => changeVibe(v.id)}>
                {v.emoji} {v.label}
              </button>
            ))}
          </div>
          {suggestion && (suggestion.style !== envelopeStyle || suggestion.sticker !== sticker) && (
            <div className="suggest-banner">
              <span>💡 {suggestion.note}</span>
              <button
                onClick={() => {
                  setEnvelopeStyle(suggestion.style);
                  setSticker(suggestion.sticker);
                }}
              >
                Coba
              </button>
            </div>
          )}
        </div>

        <div className="field-wrap">
          <div className="field-label">Gaya amplop</div>
          <div className="style-row">
            {ENVELOPE_STYLES.map((s) => (
              <button key={s.id} className={`style-chip ${envelopeStyle === s.id ? "active" : ""}`} onClick={() => setEnvelopeStyle(s.id)}>
                <span className="style-icon">{s.icon}</span>
                <span className="style-label">{s.label}</span>
                <span className="style-desc">{s.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="field-wrap">
          <div className="field-label">Stiker mood (opsional)</div>
          <div className="sticker-row">
            {MOOD_STICKERS.map((s) => (
              <button key={s} className={`sticker-chip ${sticker === s ? "active" : ""}`} onClick={() => setSticker((cur) => (cur === s ? null : s))}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="field-wrap">
          <div className="field-label">Tema latar amplop</div>
          <div className="theme-row">
            {THEMES.map((t) => (
              <button key={t.id} className={`theme-chip ${theme === t.id ? "active" : ""}`} onClick={() => setTheme(t.id)}>
                <div className="theme-swatch" style={{ background: t.swatch }} />
                <span>{t.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="field-wrap">
          <div className="field-label">Preview tampilan penerima</div>
          <div className="mini-preview" style={{ background: themeObj.grad, borderRadius: envStyleObj.cardRadius, border: envStyleObj.cardBorder }}>
            {sticker && (
              <span className="sticker-corner" style={{ fontSize: 16, top: 8, left: 10 }}>
                {sticker}
              </span>
            )}
            <RibbonSeal small variant={envStyleObj.sealVariant} sticker={sticker} />
            <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 17, color: "#b9195f", marginTop: 4 }}>
              {dari || "Kamu"} & {ke || "Dia"}
            </p>
            <span className="reveal-meta" style={{ background: themeObj.pill, color: themeObj.pillText, marginTop: 2 }}>
              {vibeObj.emoji} {vibeObj.label}
            </span>
            <p className="mini-preview-text">"{pesan ? (pesan.length > 70 ? pesan.slice(0, 70) + "…" : pesan) : "Pesan kamu bakal muncul di sini..."}"</p>
          </div>
        </div>

        <div className="field-wrap">
          <div className="template-header">
            <div className="field-label">Pesan rahasia</div>
            {usingTemplate && <span style={{ fontSize: 10, color: "var(--gold)", fontWeight: 700 }}>✓ dari template, boleh diedit</span>}
          </div>
          <textarea
            ref={pesanRef}
            className={`textarea tall ${pesanFading ? "textarea-fade" : ""}`}
            rows={6}
            maxLength={300}
            placeholder="Tulis isi hati lo di sini..."
            value={pesan}
            onChange={(e) => updatePesan(e.target.value)}
          />
          <div className="char-counter">{pesan.length}/300</div>
          {fieldErrors.pesan && (
            <p className="field-error">
              <ShieldAlert size={12} />
              {fieldErrors.pesan}
            </p>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 34, marginBottom: 30 }}>
          <button className="btn-seal" disabled={!canSubmit || submitting} onClick={handleSubmit}>
            <Lock size={14} /> {submitting ? "Nyegel amplop..." : "Segel & Bikin Link"}
          </button>
        </div>
        {error && <p style={{ fontSize: 12, color: "var(--rose)", textAlign: "center", marginTop: -18, marginBottom: 20 }}>{error}</p>}

        <div className="template-header">
          <div className="field-label">Bingung mau ngomong apa?</div>
          <button className="roll" onClick={shuffleTemplates}>
            🎲 acak lagi
          </button>
        </div>
        <div className="hint">pilih salah satu, atau tulis versi kamu sendiri di atas</div>

        {shown.map((tpl, i) => {
          const filled = fillTemplate(tpl, namaTarget);
          const active = usingTemplate && pesan === filled;
          return (
            <button key={i} className={`template-card ${active ? "selected" : ""}`} onClick={() => applyTemplate(tpl)}>
              {active && <span className="selected-pill">✓ dipilih</span>}
              <div>{filled}</div>
            </button>
          );
        })}
        <p className="write-quote">{writeQuote}</p>
      </div>
    </div>
  );
}
