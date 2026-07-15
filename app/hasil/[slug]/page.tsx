"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Copy, Check, Share2, Trophy, Download } from "lucide-react";
import { RibbonSeal, FallLayer, RankBadge } from "@/components/visuals";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { VIBES, VibeId } from "@/lib/templates";
import { ENVELOPE_STYLES, THEMES, randomCaption } from "@/lib/copy";
import { generateSaveCard } from "@/lib/save-card";
import { SaveMomentModal } from "@/components/save-moment-modal";

type HasilData = {
  dari: string;
  ke: string;
  vibe: VibeId;
  status: "pending" | "terima" | "tolak";
  balasan: string | null;
  envelope_style: "klasik" | "modern" | "playful";
  sticker: string | null;
  theme: "pink" | "lavender" | "peach" | "mint";
  created_at: string;
  opened_at: string | null;
  answered_at: string | null;
};

type WallItem = { slug: string; dari: string; ke: string; support_count?: number };

export default function HasilPage() {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const key = searchParams.get("key");

  const [data, setData] = useState<HasilData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null);
  const [top, setTop] = useState<WallItem[]>([]);
  const [saveUrl, setSaveUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!key) {
      setError("Link ini butuh token rahasia (?key=...). Pastikan lu buka link lengkap yang dikasih pas bikin amplop.");
      return;
    }
    fetch(`/api/amplop/${slug}/hasil?key=${key}`)
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.json()).error);
        return res.json();
      })
      .then(setData)
      .catch((e) => setError(e.message ?? "Gagal ambil data amplop"));
  }, [slug, key]);

  useEffect(() => {
    fetch("/api/wall")
      .then((res) => res.json())
      .then((d) => setTop((d.top ?? []).slice(0, 5)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!key) return;
    const channel = supabaseBrowser
      .channel(`amplop:${slug}`)
      .on("broadcast", { event: "answered" }, (payload) => {
        setData((prev) => (prev ? { ...prev, status: payload.payload.status, balasan: payload.payload.balasan ?? prev.balasan } : prev));
      })
      .subscribe();
    return () => {
      supabaseBrowser.removeChannel(channel);
    };
  }, [slug, key]);

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/amplop/${slug}` : `/amplop/${slug}`;
  const resultUrl = typeof window !== "undefined" ? `${window.location.origin}/hasil/${slug}?key=${key}` : `/hasil/${slug}?key=${key}`;

  function copyText(channel: string, text?: string) {
    if (text) navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedChannel(channel);
    setTimeout(() => setCopiedChannel(null), 1800);
  }

  function handleSaveMoment() {
    if (!data) return;
    const vibeObj = VIBES.find((v) => v.id === data.vibe)!;
    const url = generateSaveCard({
      dari: data.dari,
      ke: data.ke,
      pesan: "",
      vibeEmoji: vibeObj.emoji,
      vibeLabel: vibeObj.label,
      sticker: data.sticker,
    });
    setSaveUrl(url);
  }

  if (error) {
    return (
      <div className="screen" style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, textAlign: "center", padding: "0 32px" }}>
        <p style={{ color: "var(--text-hi)", fontSize: 15 }}>Gak bisa buka halaman ini.</p>
        <p style={{ color: "var(--text-mid)", fontSize: 12 }}>{error}</p>
      </div>
    );
  }
  if (!data) {
    return <div className="screen" style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}><p style={{ color: "var(--text-mid)", fontSize: 13 }}>Memuat...</p></div>;
  }

  const vibe = VIBES.find((v) => v.id === data.vibe)!;
  const envStyle = ENVELOPE_STYLES.find((s) => s.id === data.envelope_style)!;
  const theme = THEMES.find((t) => t.id === data.theme)!;

  return (
    <div className="screen page-anim" style={{ minHeight: "100dvh" }}>
      <FallLayer />
      {saveUrl && (
        <SaveMomentModal url={saveUrl} filename={`amplop-cinta-${data.dari.toLowerCase()}-${data.ke.toLowerCase()}.png`} onClose={() => setSaveUrl(null)} />
      )}

      <div className="content">
        <div className="topbar">
          <div className="label">Amplop Jadi!</div>
        </div>

        <div className="save-link-warning">
          <p className="save-link-warning-title">⚠️ SIMPEN LINK INI SEKARANG</p>
          <p className="save-link-warning-body">Halaman ini gak bisa dibuka ulang kalau link-nya ilang — gak ada login buat recovery. Copy dulu ke Notes/WhatsApp diri sendiri sebelum nutup tab ini.</p>
          <button
            className="save-link-copy-btn"
            onClick={() => {
              navigator.clipboard?.writeText(resultUrl).catch(() => {});
              copyText("resultLink");
            }}
          >
            {copiedChannel === "resultLink" ? <Check size={14} /> : <Copy size={14} />}
            {copiedChannel === "resultLink" ? "Tersalin! Sekarang paste ke Notes" : "Copy link ini & simpan"}
          </button>
        </div>

        <div className="summary-card" style={{ background: theme.grad, borderRadius: envStyle.cardRadius, border: envStyle.cardBorder }}>
          <span className="vibe-tag">
            {vibe.emoji} {vibe.label}
          </span>
          {data.sticker && <span className="sticker-corner">{data.sticker}</span>}
          <RibbonSeal small variant={envStyle.sealVariant} sticker={data.sticker} />
          <p style={{ fontSize: 13, color: "var(--text-mid)" }}>Amplop cinta buat</p>
          <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 800, fontSize: 25, color: "#b9195f" }}>{data.ke}</p>
          <p style={{ fontSize: 11, color: "#c78ea3" }}>dari {data.dari} · disegel rapat 🔒</p>
        </div>

        <div className="link-box link-box-highlight" style={{ position: "relative" }}>
          <span>{shareUrl.replace(/^https?:\/\//, "")}</span>
          <button onClick={() => copyText("link", shareUrl)} style={{ color: copiedChannel === "link" ? "#1f9d6a" : "var(--rose-deep)", background: "none", border: "none" }}>
            {copiedChannel === "link" ? <Check size={16} /> : <Copy size={16} />}
          </button>
          {copiedChannel === "link" && <span className="copy-toast">Link tersalin! ✓</span>}
        </div>

        <div className="share-row">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(randomCaption(shareUrl))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ textDecoration: "none" }}
          >
            <Share2 size={14} /> WhatsApp
          </a>
          <button className="btn-x" onClick={() => copyText("x", randomCaption(shareUrl))}>
            𝕏 {copiedChannel === "x" ? "Tersalin!" : "Post ke X"}
          </button>
        </div>
        <p className="share-caption-toggle">Tap tombol untuk salin pesan unik dan langsung bagikan!</p>

        <div className="follow-card">
          <div className="follow-x-badge">𝕏</div>
          <div className="follow-copy">
            <p>Follow @ceritagenz</p>
            <p>Random thoughts generasi yang capek tapi tetep jalan 🫡</p>
          </div>
          <a href="https://x.com/ceritagenz" target="_blank" rel="noopener noreferrer" className="btn-follow" style={{ textDecoration: "none" }}>
            Follow
          </a>
        </div>

        <button className="preview-recipient-btn" onClick={handleSaveMoment}>
          <Download size={13} /> Simpan sebagai Gambar
        </button>

        <div className="status-card">
          {data.status === "pending" && (
            <p style={{ fontSize: 12.5 }}>
              <span className="heartbeat" style={{ display: "inline-block" }}>💗</span> Nunggu {data.ke} buka amplopnya...
            </p>
          )}
          {data.status === "terima" && (
            <div key="status-terima" className="status-pulse">
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--rose-deep)" }}>🎉 Diterima! {data.ke} bilang iya.</p>
              {data.balasan && <p style={{ fontSize: 12.5, fontWeight: 600, fontStyle: "italic", marginTop: 4 }}>"{data.balasan}"</p>}
            </div>
          )}
          {data.status === "tolak" && (
            <div key="status-tolak" className="status-pulse">
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-mid)" }}>{data.ke} belum siap. Tetep semangat ya 🤍</p>
              {data.balasan && <p style={{ fontSize: 12.5, fontStyle: "italic", marginTop: 4 }}>"{data.balasan}"</p>}
            </div>
          )}
        </div>

        <div className="leaderboard-panel">
          <div className="section-heading" style={{ marginBottom: 14 }}>
            <div className="section-heading-left">
              <div className="section-badge">
                <Trophy size={13} />
              </div>
              <span className="section-title">Top Pasangan</span>
            </div>
          </div>
          {top.length === 0 ? (
            <div className="empty-state">
              <p>Jadilah top 1 pasangan paling romantis minggu ini!</p>
              <p className="empty-sub">Kirim amplop sekarang 💌</p>
            </div>
          ) : (
            <div className="leaderboard">
              {top.map((p, i) => (
                <div key={p.slug} className={`leaderboard-row ${i === 0 ? "rank1" : ""}`}>
                  <RankBadge i={i} />
                  <div className="pair-name">
                    {p.dari}
                    <span className="amp">&amp;</span>
                    {p.ke}
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link href="/diterima" className="see-all-btn" style={{ textDecoration: "none" }}>
            Lihat semua peringkat →
          </Link>
        </div>
      </div>
    </div>
  );
}
