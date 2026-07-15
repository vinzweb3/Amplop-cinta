"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Heart, X, PartyPopper, Mail, Send, ShieldAlert, RefreshCw, Download } from "lucide-react";
import { RibbonSeal, FallLayer, BurstHearts, renderWithNames } from "@/components/visuals";
import { VIBES, VibeId } from "@/lib/templates";
import { containsBadWord } from "@/lib/badwords";
import {
  QUOTE_POOL,
  TAP_HINTS,
  REPLY_SUGGESTIONS,
  TERIMA_HEADLINES,
  SURRENDER_MESSAGES,
  TOLAK_STAGES,
  ENVELOPE_STYLES,
  THEMES,
  pickRandom,
  pickRandomN,
} from "@/lib/copy";
import { playChime } from "@/lib/chime";
import { generateSaveCard } from "@/lib/save-card";
import { SaveMomentModal } from "@/components/save-moment-modal";

type AmplopData = {
  dari: string;
  ke: string;
  pesan: string;
  vibe: VibeId;
  status: "pending" | "terima" | "tolak";
  balasan: string | null;
  envelope_style: "klasik" | "modern" | "playful";
  sticker: string | null;
  theme: "pink" | "lavender" | "peach" | "mint";
};

export default function AmplopPage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<AmplopData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [envelopeOpening, setEnvelopeOpening] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [pendingAnswer, setPendingAnswer] = useState<"terima" | null>(null);
  const [answer, setAnswer] = useState<"terima" | null>(null);
  const [reply, setReply] = useState("");
  const [replyError, setReplyError] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [terimaPulsing, setTerimaPulsing] = useState(false);
  const [burst, setBurst] = useState(false);
  const [burstVariant, setBurstVariant] = useState<"confetti" | "climax" | "hearts">("confetti");
  const [tolakStage, setTolakStage] = useState(0);
  const [wiltKey, setWiltKey] = useState(0);
  const [surrendered, setSurrendered] = useState(false);
  const [surrenderMessage, setSurrenderMessage] = useState("");
  const [terimaHeadline, setTerimaHeadline] = useState(TERIMA_HEADLINES[0]);

  const [quotes, setQuotes] = useState<string[]>([]);
  const [activeQuote, setActiveQuote] = useState(0);
  const [tapHint, setTapHint] = useState("");
  const quoteWrapRef = useRef<HTMLDivElement | null>(null);

  const [saveUrl, setSaveUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/amplop/${slug}`)
      .then(async (res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((d: AmplopData) => {
        setData(d);
        if (d.status !== "pending") setAnswer(d.status === "terima" ? "terima" : null);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!envelopeOpen) {
      setQuotes(pickRandomN(QUOTE_POOL, 5));
      setActiveQuote(0);
      setTapHint(pickRandom(TAP_HINTS));
    }
  }, [envelopeOpen]);

  function handleQuoteScroll() {
    const el = quoteWrapRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0,
      closestDist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const el2 = c as HTMLElement;
      const mid = el2.offsetLeft + el2.offsetWidth / 2;
      const d = Math.abs(mid - center);
      if (d < closestDist) {
        closestDist = d;
        closest = i;
      }
    });
    setActiveQuote(closest);
  }

  function openEnvelope() {
    setEnvelopeOpening(true);
    setTimeout(() => {
      setEnvelopeOpening(false);
      setEnvelopeOpen(true);
    }, 620);
  }

  function handleTerimaClick() {
    setTerimaPulsing(true);
    setBurstVariant("confetti");
    setBurst(true);
    setTimeout(() => setTerimaPulsing(false), 380);
    setTimeout(() => setBurst(false), 2400);
    setTimeout(() => setPendingAnswer("terima"), 500);
  }

  function handleTolakClick() {
    if (tolakStage < 4) {
      setTolakStage((s) => s + 1);
      setWiltKey((k) => k + 1);
    } else {
      setBurstVariant("hearts");
      setBurst(true);
      setSurrenderMessage(pickRandom(SURRENDER_MESSAGES));
      setTimeout(() => setSurrendered(true), 900);
      setTimeout(() => setBurst(false), 2400);
    }
  }

  async function submitAnswer(finalAnswer: "terima" | "tolak", replyText: string) {
    const res = await fetch(`/api/amplop/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: finalAnswer, balasan: replyText }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Gagal ngirim jawaban");
  }

  async function sendReply() {
    if (sendingReply || !reply.trim() || replyError) return;
    setSendingReply(true);
    setSubmitError(null);
    setTimeout(async () => {
      try {
        await submitAnswer("terima", reply);
        setAnswer("terima");
        setBurstVariant("climax");
        setBurst(true);
        setTimeout(() => setBurst(false), 2600);
        setTerimaHeadline(pickRandom(TERIMA_HEADLINES));
        playChime();
      } catch (e: any) {
        setSubmitError(e.message ?? "Gagal ngirim jawaban, coba lagi ya");
      } finally {
        setSendingReply(false);
      }
    }, 650);
  }

  async function confirmSurrender() {
    try {
      await submitAnswer("tolak", "Ya, aku siap 🥺 (setelah dirayu beberapa kali)");
    } catch {}
  }

  useEffect(() => {
    if (surrendered) confirmSurrender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surrendered]);

  function handleSaveMoment() {
    if (!data) return;
    const vibeObj = VIBES.find((v) => v.id === data.vibe)!;
    const url = generateSaveCard({
      dari: data.dari,
      ke: data.ke,
      pesan: data.pesan,
      vibeEmoji: vibeObj.emoji,
      vibeLabel: vibeObj.label,
      sticker: data.sticker,
    });
    setSaveUrl(url);
  }

  if (loading) {
    return <div className="screen" style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ color: "var(--text-mid)", fontSize: 13 }}>Buka amplop...</p></div>;
  }
  if (notFound || !data) {
    return (
      <div className="screen" style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, textAlign: "center", padding: "0 32px" }}>
        <p style={{ color: "var(--text-hi)", fontSize: 15 }}>Amplop ini gak ketemu.</p>
        <p style={{ color: "var(--text-mid)", fontSize: 12 }}>Mungkin link-nya salah ketik, atau amplopnya udah gak ada.</p>
      </div>
    );
  }

  const vibe = VIBES.find((v) => v.id === data.vibe)!;
  const envStyle = ENVELOPE_STYLES.find((s) => s.id === data.envelope_style)!;
  const theme = THEMES.find((t) => t.id === data.theme)!;

  return (
    <div className="screen page-anim" style={{ minHeight: "100dvh" }}>
      {burst && <BurstHearts variant={burstVariant} />}
      {saveUrl && (
        <SaveMomentModal
          url={saveUrl}
          filename={`amplop-cinta-${data.dari.toLowerCase()}-${data.ke.toLowerCase()}.png`}
          onClose={() => setSaveUrl(null)}
        />
      )}

      <div className="content">
        <div className="topbar">
          <div className="label">Amplop Masuk</div>
        </div>

        {!envelopeOpen && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, paddingTop: 40, position: "relative" }}>
            <FallLayer />
            <p style={{ fontSize: 12.5, color: "var(--text-mid)", position: "relative", zIndex: 2 }}>{data.dari} ngirim amplop buat kamu...</p>
            <button onClick={openEnvelope} style={{ background: "none", border: "none", position: "relative", zIndex: 2 }}>
              <div className={`envelope ${envelopeOpening ? "opening" : "idle-pulse"}`}>
                <div className="flap" />
                <RibbonSeal small beating variant={envStyle.sealVariant} sticker={data.sticker} />
              </div>
            </button>
            <p style={{ fontSize: 12, color: "var(--text-mid)", fontWeight: 500, position: "relative", zIndex: 2 }}>{tapHint}</p>

            <div style={{ width: "100%", position: "relative", zIndex: 2 }}>
              <div className="motivation-wrap" ref={quoteWrapRef} onScroll={handleQuoteScroll}>
                {quotes.map((q, i) => (
                  <p className="motivation-quote" key={i}>
                    <span className="qm">❝</span>
                    {q}
                  </p>
                ))}
              </div>
              <div className="quote-dots">
                {quotes.map((_, i) => (
                  <span key={i} className={`quote-dot ${activeQuote === i ? "active" : ""}`} />
                ))}
              </div>
              <p className="motivation-hint">← geser buat liat kata-kata lainnya →</p>
            </div>
          </div>
        )}

        {envelopeOpen && !pendingAnswer && !surrendered && !answer && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
            <FallLayer />
            <div className="reveal-card" style={{ position: "relative", zIndex: 2, background: theme.grad, borderRadius: envStyle.cardRadius, border: envStyle.cardBorder }}>
              <span className="reveal-quote-mark">❝</span>
              <span className="reveal-meta" style={{ background: theme.pill, color: theme.pillText }}>
                {vibe.emoji} {vibe.label} · dari {data.dari}
              </span>
              <p className="reveal-msg">{data.pesan}</p>
              <div className="reveal-divider">
                <span />
                <Heart size={12} fill="#f5487a" color="#f5487a" className="divider-heart" />
                <span />
              </div>
              <p className="reveal-q">💗 Mau jadi pacar {data.dari}? 💗</p>
            </div>
            <div className="share-row" style={{ position: "relative", zIndex: 2, marginBottom: 0, alignItems: "center" }}>
              <button className="btn-outline" onClick={handleTolakClick}>
                {tolakStage < 4 ? <X size={15} /> : <Heart size={15} fill="#d6236a" color="#d6236a" />} {TOLAK_STAGES[tolakStage]}
                {tolakStage > 0 && tolakStage < 4 && (
                  <span className="wilt-wrap">
                    <span key={wiltKey} className="wilt-heart">💔</span>
                  </span>
                )}
              </button>
              <button className={`btn-primary btn-terima-bounce ${terimaPulsing ? "pulsing" : ""}`} style={{ flex: 1 }} onClick={handleTerimaClick}>
                <Heart size={15} fill="#fff" /> Terima
              </button>
            </div>
          </div>
        )}

        {envelopeOpen && pendingAnswer && !answer && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ textAlign: "center", fontSize: 13, fontWeight: 600 }}>Yay! Kasih balasan buat dia yuk 💌</p>
            <div className="reply-chip-grid">
              {REPLY_SUGGESTIONS.map((s, i) => {
                const isLastOdd = REPLY_SUGGESTIONS.length % 2 === 1 && i === REPLY_SUGGESTIONS.length - 1;
                return (
                  <button
                    key={i}
                    className={`chip ${isLastOdd ? "chip-full" : ""}`}
                    onClick={() => {
                      setReply(s);
                      setReplyError("");
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <textarea
              className="textarea"
              rows={3}
              placeholder="Tulis balasan kamu di sini..."
              value={reply}
              onChange={(e) => {
                const val = e.target.value;
                setReply(val);
                setReplyError(containsBadWord(val) ? "Balasan mengandung kata terlarang" : "");
              }}
            />
            {replyError && (
              <p className="field-error">
                <ShieldAlert size={12} />
                {replyError}
              </p>
            )}
            {submitError && (
              <p className="field-error">
                <ShieldAlert size={12} />
                {submitError}
              </p>
            )}
            <button className="btn-primary" style={{ position: "relative", zIndex: 5 }} disabled={!reply.trim() || !!replyError || sendingReply} onClick={sendReply}>
              {sendingReply ? <span className="fly-envelope">💌</span> : <Send size={15} />} {sendingReply ? "Mengirim..." : "Kirim Balasan"}
            </button>
            <button className="btn-ghost ganti-jawaban-btn" onClick={() => setPendingAnswer(null)}>
              <RefreshCw size={12} /> ganti jawaban
            </button>
          </div>
        )}

        {answer === "terima" && (
          <div className="page-anim" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center", paddingTop: 40, position: "relative" }}>
            <div style={{ opacity: 0.55, position: "absolute", inset: 0, pointerEvents: "none" }}>
              <FallLayer dense petals />
            </div>
            <div className="surrender-fade" style={{ position: "relative", zIndex: 2 }}>
              <PartyPopper size={44} color="var(--gold)" />
            </div>
            <div className="terima-textpanel surrender-fade" style={{ position: "relative", zIndex: 2, animationDelay: ".1s" }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: 24, lineHeight: 1.3, textAlign: "center" }}>{terimaHeadline.main}</p>
              <p
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "var(--text-mid)",
                  maxWidth: 260,
                  margin: "10px auto 0",
                  textAlign: "center",
                }}
              >
                {renderWithNames(terimaHeadline.sub, data.dari, data.ke)}
              </p>
              <p style={{ fontSize: 12.5, lineHeight: 1.6, color: "var(--rose-deep)", fontWeight: 800, maxWidth: 240, margin: "22px auto 0", textAlign: "center" }}>
                {data.dari} udah nungguin kabar baik ini, yuk kasih tau dia! 💌
              </p>
            </div>
            <div className="surrender-fade" style={{ position: "relative", zIndex: 2, display: "flex", gap: 14, width: "100%", marginTop: 20, animationDelay: ".46s" }}>
              <Link href="/" className="btn-slim-outline" style={{ textDecoration: "none" }}>
                <Mail size={14} /> Balik ke beranda
              </Link>
              <button
                className="btn-slim-solid"
                onClick={() => {
                  const text = `${data.dari} & ${data.ke} resmi jadian lewat Amplop Cinta 💕 4uonly.vercel.app`;
                  if (navigator.share) navigator.share({ title: "Amplop Cinta", text }).catch(() => {});
                  else navigator.clipboard?.writeText(text).catch(() => {});
                }}
              >
                <Send size={14} /> Kasih tau {data.dari}
              </button>
            </div>
            <button className="save-pill-btn surrender-fade" style={{ animationDelay: ".58s" }} onClick={handleSaveMoment}>
              <Download size={13} /> Simpan sebagai Gambar
            </button>
            <Link href="/buat" className="make-own-cta surrender-fade" style={{ marginTop: 16, animationDelay: ".7s" }}>
              💌 Bikin amplop cinta kamu sendiri →
            </Link>
          </div>
        )}

        {surrendered && (
          <div className="page-anim" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center", paddingTop: 40, position: "relative" }}>
            <FallLayer dense />
            <div style={{ position: "relative", zIndex: 2 }}>
              <Heart size={44} fill="#f5487a" color="#f5487a" />
            </div>
            <p
              className="surrender-fade"
              style={{ position: "relative", zIndex: 2, fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 600, fontSize: 18, lineHeight: 1.65, color: "var(--text-hi)", maxWidth: 280 }}
            >
              {surrenderMessage} 🥺✨
            </p>
            <Link href="/" className="btn-primary surrender-fade" style={{ textDecoration: "none", marginTop: 6, animationDelay: ".25s" }}>
              <Mail size={15} /> Balik ke beranda
            </Link>
            <Link href="/buat" className="make-own-cta surrender-fade" style={{ marginTop: 4, animationDelay: ".4s" }}>
              💌 Bikin amplop cinta kamu sendiri →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
