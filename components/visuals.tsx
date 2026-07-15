"use client";

import React from "react";
import { Heart } from "lucide-react";

export function RibbonSeal({
  small,
  beating,
  variant = "wax",
  sticker,
}: {
  small?: boolean;
  beating?: boolean;
  variant?: "wax" | "flat" | "sticker";
  sticker?: string | null;
}) {
  if (variant === "flat") {
    return (
      <div className={`ribbon-seal ${small ? "sm" : ""}`}>
        <div className="ring flat-ring" />
        <Heart size={small ? 34 : 46} fill="none" color="#d6236a" strokeWidth={2} className={`heart-icon ${beating ? "heartbeat" : ""}`} />
      </div>
    );
  }
  if (variant === "sticker") {
    return (
      <div className={`ribbon-seal ${small ? "sm" : ""}`}>
        <div className="ring" />
        <span className={`sticker-icon ${beating ? "heartbeat" : ""}`} style={{ fontSize: small ? 40 : 56 }}>
          {sticker || "🎈"}
        </span>
      </div>
    );
  }
  return (
    <div className={`ribbon-seal ${small ? "sm" : ""}`}>
      <div className="ring" />
      <Heart size={small ? 40 : 56} fill="#f5487a" color="#f5487a" strokeWidth={0} className={`heart-icon ${beating ? "heartbeat" : ""}`} />
    </div>
  );
}

export function FallLayer({ dense, petals }: { dense?: boolean; petals?: boolean }) {
  const items = [
    { l: 6, s: 16, c: "#f5487a", d: 6, delay: 0, e: "♥" },
    { l: 18, s: 11, c: "#f0b93e", d: 5, delay: 1.2, e: "✦" },
    { l: 30, s: 20, c: "#ffb3cb", d: 7.5, delay: 2, e: "♥" },
    { l: 45, s: 13, c: "#f5487a", d: 6.5, delay: 0.6, e: "♥" },
    { l: 58, s: 10, c: "#f0b93e", d: 5.5, delay: 3, e: "✦" },
    { l: 70, s: 18, c: "#ffb3cb", d: 8, delay: 1.5, e: "♥" },
    { l: 82, s: 14, c: "#f5487a", d: 6, delay: 2.6, e: "♥" },
    { l: 92, s: 11, c: "#f0b93e", d: 5, delay: 0.3, e: "✦" },
  ];
  const extra = dense
    ? [
        { l: 12, s: 15, c: "#ffb3cb", d: 5.4, delay: 0.9, e: "♥" },
        { l: 24, s: 12, c: "#f5487a", d: 6.2, delay: 2.1, e: "💖" },
        { l: 38, s: 17, c: "#f0b93e", d: 5.8, delay: 1.6, e: "✦" },
        { l: 52, s: 14, c: "#ffb3cb", d: 7, delay: 0.4, e: "♥" },
        { l: 64, s: 13, c: "#f5487a", d: 5.2, delay: 2.4, e: "💖" },
        { l: 76, s: 16, c: "#f0b93e", d: 6.6, delay: 1.1, e: "✦" },
        { l: 88, s: 12, c: "#ffb3cb", d: 5.6, delay: 0.2, e: "♥" },
        { l: 96, s: 15, c: "#f5487a", d: 6.8, delay: 1.8, e: "💖" },
      ]
    : [];
  const petalItems = petals
    ? [
        { l: 8, s: 20, d: 9, delay: 0.3, e: "🌸" },
        { l: 28, s: 16, d: 10.5, delay: 2.4, e: "🌸" },
        { l: 48, s: 22, d: 8.5, delay: 1.1, e: "🌸" },
        { l: 68, s: 17, d: 11, delay: 3.2, e: "🌸" },
        { l: 86, s: 19, d: 9.5, delay: 0.7, e: "🌸" },
      ]
    : [];
  return (
    <div className="fall-layer">
      {[...items, ...extra].map((it, i) => (
        <div key={i} className="falling" style={{ left: `${it.l}%`, fontSize: it.s, color: it.c, animationDuration: `${it.d}s`, animationDelay: `${it.delay}s` }}>
          {it.e}
        </div>
      ))}
      {petalItems.map((it, i) => (
        <div key={`p${i}`} className="falling petal" style={{ left: `${it.l}%`, fontSize: it.s, animationDuration: `${it.d}s`, animationDelay: `${it.delay}s` }}>
          {it.e}
        </div>
      ))}
      <div className="twinkle" style={{ top: 60, left: "12%", fontSize: 13, color: "#f0b93e" }}>✦</div>
      <div className="twinkle" style={{ top: 120, right: "10%", fontSize: 16, color: "#f5487a", animationDelay: ".8s" }}>✦</div>
      <div className="twinkle" style={{ top: 380, left: "8%", fontSize: 11, color: "#f0b93e", animationDelay: "1.4s" }}>✦</div>
    </div>
  );
}

export function BurstHearts({ variant = "confetti" }: { variant?: "confetti" | "climax" | "hearts" }) {
  const glyphs = variant === "climax" ? ["💖", "🎉", "✨", "💗", "🎊", "💛", "⭐", "🌟", "💕"] : variant === "confetti" ? ["💖", "🎉", "✨", "💗", "🎊", "💛"] : ["💖"];
  const count = variant === "climax" ? 52 : 34;
  const items = Array.from({ length: count }).map(() => ({
    left: Math.random() * 100,
    size: 15 + Math.random() * 24,
    delay: Math.random() * 0.8,
    dur: 2 + Math.random() * 1.5,
    drift: (Math.random() - 0.5) * 70,
    glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
  }));
  return (
    <div className="burst-layer">
      {items.map((it, i) => (
        // @ts-ignore -- custom CSS property
        <div key={i} className="burst-heart" style={{ left: `${it.left}%`, fontSize: it.size, animationDelay: `${it.delay}s`, animationDuration: `${it.dur}s`, "--drift": `${it.drift}px` }}>
          {it.glyph}
        </div>
      ))}
    </div>
  );
}

export function renderWithNames(template: string, dari: string, ke: string) {
  const parts = template.split(/(\{dari\}|\{ke\})/g);
  return parts.map((p, i) => {
    if (p === "{dari}") return <strong key={i} className="name-highlight">{dari}</strong>;
    if (p === "{ke}") return <strong key={i} className="name-highlight">{ke}</strong>;
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
}

export function RankBadge({ i }: { i: number }) {
  if (i === 0) return <div className="rank-badge r1">🥇</div>;
  if (i === 1) return <div className="rank-badge r2">🥈</div>;
  if (i === 2) return <div className="rank-badge r3">🥉</div>;
  return <div className="rank-badge other">{i + 1}</div>;
}
