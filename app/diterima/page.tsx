"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trophy, Heart } from "lucide-react";
import { RankBadge } from "@/components/visuals";
import { VIBES, VibeId } from "@/lib/templates";

type WallItem = { slug: string; dari: string; ke: string; vibe?: VibeId; support_count?: number };

const VIBE_TAG_STYLE: Record<string, { bg: string; text: string }> = {
  manis: { bg: "#fff6e2", text: "#b9822c" },
  savage: { bg: "#ffe6e0", text: "#c2461f" },
  misteri: { bg: "#ece6ff", text: "#5a4fb0" },
};

export default function DiterimaPage() {
  const router = useRouter();
  const [recent, setRecent] = useState<WallItem[] | null>(null);
  const [top, setTop] = useState<WallItem[]>([]);
  const [remaining, setRemaining] = useState(10);
  const [supported, setSupported] = useState<string[]>([]);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    fetch("/api/wall")
      .then((res) => res.json())
      .then((d) => {
        setRecent(d.recent ?? []);
        setTop(d.top ?? []);
      })
      .catch(() => setRecent([]));

    fetch("/api/support")
      .then((res) => res.json())
      .then((d) => {
        setRemaining(d.remaining ?? 10);
        setSupported(d.supported ?? []);
      })
      .catch(() => {});
  }, []);

  async function handleSupport(slug: string) {
    if (supported.includes(slug) || remaining <= 0) return;
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const json = await res.json();
      if (!res.ok) return;
      setRemaining(json.remaining);
      setSupported((s) => [...s, slug]);
      setTop((t) => t.map((p) => (p.slug === slug ? { ...p, support_count: (p.support_count ?? 0) + 1 } : p)));
    } catch {}
  }

  return (
    <div className="screen page-anim">
      <div className="content">
        <div className="topbar">
          <button className="back" onClick={() => router.push("/")}>
            <ArrowLeft size={17} />
          </button>
          <div className="label">Amplop Diterima</div>
        </div>

        <div className="section-heading">
          <div className="section-heading-left">
            <div className="section-badge">
              <Trophy size={13} />
            </div>
            <span className="section-title">Top Pasangan</span>
          </div>
          <button className="support-remaining" onClick={() => setShowInfo((s) => !s)}>
            <span style={{ color: "var(--gold)" }}>💛</span> {remaining} support tersisa hari ini
          </button>
        </div>
        {showInfo && (
          <p className="support-tooltip">💡 Support = kasih apresiasi ke pasangan yang amplopnya diterima. Tiap orang dapet 10 support/hari, reset tiap 24 jam.</p>
        )}

        {top.length === 0 ? (
          <div className="empty-state">
            <div className="ghost-rows">
              {[1, 2, 3].map((i) => (
                <div key={i} className="ghost-row">
                  <div className="ghost-rank">{i}</div>
                  <div className="ghost-name" />
                  <div className="ghost-heart" />
                </div>
              ))}
            </div>
            <p>Jadilah top 1 pasangan paling romantis minggu ini!</p>
            <p className="empty-sub">Kirim amplop sekarang 💌</p>
          </div>
        ) : (
          <div className="leaderboard">
            {top.map((p, i) => {
              const isSupported = supported.includes(p.slug);
              return (
                <div key={p.slug} className={`leaderboard-row ${i === 0 ? "rank1" : ""}`}>
                  <RankBadge i={i} />
                  <div className="pair-name">
                    {p.dari}
                    <span className="amp">&amp;</span>
                    {p.ke}
                  </div>
                  <button className={`support-btn ${isSupported ? "supported" : ""}`} disabled={isSupported || remaining <= 0} onClick={() => handleSupport(p.slug)}>
                    <Heart size={12} fill={isSupported ? "#fff" : "#d6236a"} color={isSupported ? "#fff" : "#d6236a"} />
                    {p.support_count ?? 0}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <div className="section-heading" style={{ marginTop: 22 }}>
          <div className="section-heading-left">
            <div className="section-badge" style={{ background: "linear-gradient(135deg,#ffb3cb,var(--rose))" }}>
              <Heart size={12} fill="#fff" color="#fff" />
            </div>
            <span className="section-title">Baru Diterima</span>
          </div>
        </div>
        <div className="legend-row">
          {VIBES.map((v) => (
            <div key={v.id} className="legend-chip">
              {v.emoji} {v.label}
            </div>
          ))}
        </div>

        {recent === null && <p style={{ fontSize: 12, color: "var(--text-mid)" }}>Memuat...</p>}
        {recent && recent.length === 0 && (
          <div className="empty-state">
            <div className="ghost-rows">
              {[1, 2].map((i) => (
                <div key={i} className="ghost-row">
                  <div className="ghost-avatar" />
                  <div className="ghost-name" />
                  <div className="ghost-tag" />
                </div>
              ))}
            </div>
            <p>Amplop pertama yang diterima bakal muncul di sini.</p>
            <p className="empty-sub">Bisa jadi punya kamu 💌</p>
          </div>
        )}
        {recent && recent.length > 0 && (
          <>
            {recent.map((w, i) => {
              const tag = VIBE_TAG_STYLE[w.vibe || "manis"];
              return (
                <div key={i} className="wall-row">
                  <div className="wall-avatar">{w.dari[0]}</div>
                  <div className="wall-names">
                    {w.dari} → {w.ke}
                  </div>
                  <span className="wall-tag" style={{ background: tag.bg, color: tag.text }}>
                    {VIBES.find((v) => v.id === w.vibe)?.emoji} diterima
                  </span>
                </div>
              );
            })}
          </>
        )}
        <p className="privacy-note">
          🔒 cuma nama & status yang ditampilin, pesan pribadi tetep <strong>rahasia</strong>
        </p>
      </div>
    </div>
  );
}
