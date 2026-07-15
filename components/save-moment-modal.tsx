"use client";

import { Download, X } from "lucide-react";

export function SaveMomentModal({
  url,
  filename,
  onClose,
}: {
  url: string;
  filename: string;
  onClose: () => void;
}) {
  return (
    <div className="save-modal-overlay" onClick={onClose}>
      <div className="save-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="save-modal-close" onClick={onClose} aria-label="Tutup">
          <X size={16} />
        </button>
        <img src={url} alt="Kartu kenangan Amplop Cinta" className="save-modal-img" />
        <p className="save-modal-hint">📌 Tekan lama gambarnya buat simpan ke galeri ya!</p>
        <a className="save-modal-download" href={url} download={filename}>
          <Download size={14} style={{ marginRight: 5, verticalAlign: "-2px" }} />
          Simpan Gambar Ini
        </a>
      </div>
    </div>
  );
}
