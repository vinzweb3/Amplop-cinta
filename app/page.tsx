"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RibbonSeal, FallLayer } from "@/components/visuals";

const SPOTLIGHT_FALLBACK = { dari: "Jeshin", ke: "Lucia" };

export default function LandingPage() {
  const [statCount, setStatCount] = useState(0);
  const [spotlight, setSpotlight] = useState<{ dari: string; ke: string }[]>([SPOTLIGHT_FALLBACK]);
  const [spotlightIdx, setSpotlightIdx] = useState(0);

  useEffect(() => {
    fetch("/api/wall")
      .then((res) => res.json())
      .then((d) => {
        if (d.recent && d.recent.length > 0) {
          setSpotlight([SPOTLIGHT_FALLBACK, ...d.recent.slice(0, 5)]);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSpotlightIdx((i) => (i + 1) % spotlight.length), 3500);
    return () => clearInterval(t);
  }, [spotlight.length]);

  useEffect(() => {
    const target = 1284;
    const duration = 1200;
    const start = performance.now();
    let raf: number;
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setStatCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    const liveTick = setInterval(() => setStatCount((c) => c + 1), 6000 + Math.random() * 4000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(liveTick);
    };
  }, []);

  const current = spotlight[spotlightIdx] || SPOTLIGHT_FALLBACK;

  return (
    <div className="screen page-anim" style={{ minHeight: "100dvh" }}>
      <FallLayer />
      <div className="content">
        <div className="topspace" />
        <RibbonSeal />
        <h1 className="brand-title">
          Amplop <span className="script">Cinta</span>
        </h1>
        <p className="tagline">
          Segel perasaan lo, kirim ke dia 💌
          <br />
          Biar dia yang buka sendiri amplopnya, pelan-pelan.
        </p>

        <div className="spotlight-card">
          <div className="spotlight-avatars">
            <div className="spotlight-avatar">{current.dari[0]}</div>
            <div className="spotlight-avatar second">{current.ke[0]}</div>
          </div>
          <span className="spotlight-text">
            <span className="live-dot" />
            {current.dari} & {current.ke} baru aja diterima 🎉
          </span>
        </div>

        <div className="stat-pill">
          <span className="dot" />
          {statCount.toLocaleString("id-ID")} amplop terkirim hari ini
        </div>

        <Link href="/buat" className="btn-primary" style={{ textDecoration: "none" }}>
          💌 Bikin Amplop Cinta
        </Link>
        <Link href="/diterima" className="btn-ghost" style={{ textDecoration: "none", display: "block", textAlign: "center" }}>
          🎉 Lihat amplop yang udah diterima →
        </Link>
      </div>
    </div>
  );
}
