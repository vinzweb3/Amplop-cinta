export type SaveCardInput = {
  dari: string;
  ke: string;
  pesan: string;
  vibeEmoji: string;
  vibeLabel: string;
  sticker: string | null;
};

function wrapCanvasText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  words.forEach((w) => {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  return lines;
}

/** Generate kartu ucapan 9:16 dan kembalikan data URL PNG-nya. Cuma jalan di browser. */
export function generateSaveCard(input: SaveCardInput): string {
  const W = 1080, H = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, "#ffe0eb");
  bgGrad.addColorStop(0.5, "#fff2f6");
  bgGrad.addColorStop(1, "#ffffff");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  const outerPad = 72;
  const innerPad = 76;
  const cardX = outerPad, cardW = W - outerPad * 2;
  const centerX = W / 2;
  const textMaxWidth = cardW - innerPad * 2;

  ctx.font = "italic 30px Georgia, serif";
  const pesanText = input.pesan || "Segel perasaan lo, kirim ke dia.";
  const lines = wrapCanvasText(ctx, pesanText, textMaxWidth);
  const msgLineHeight = 48;

  const titleH = 60, subtitleGap = 66, dividerGap = 60, toMessageGap = 56, toTagGap = 50, tagH = 30;
  const msgHeight = lines.length * msgLineHeight;
  const contentHeight = titleH + subtitleGap + dividerGap + toMessageGap + msgHeight + toTagGap + tagH;
  const cardH = contentHeight + innerPad * 2;

  const topArea = 260, bottomArea = 220;
  const availableH = H - topArea - bottomArea;
  const cardY = topArea + Math.max(0, (availableH - cardH) / 2);

  const radius = 40;
  ctx.save();
  ctx.shadowColor = "rgba(214,35,106,0.28)";
  ctx.shadowBlur = 50;
  ctx.shadowOffsetY = 18;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(cardX + radius, cardY);
  ctx.arcTo(cardX + cardW, cardY, cardX + cardW, cardY + cardH, radius);
  ctx.arcTo(cardX + cardW, cardY + cardH, cardX, cardY + cardH, radius);
  ctx.arcTo(cardX, cardY + cardH, cardX, cardY, radius);
  ctx.arcTo(cardX, cardY, cardX + cardW, cardY, radius);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = "#ffc7da";
  ctx.lineWidth = 3;
  ctx.stroke();

  let cursorY = cardY + innerPad + 20;

  ctx.textAlign = "center";
  ctx.font = "72px Arial";
  ctx.fillText(input.sticker || "💌", centerX, cardY - 40);

  ctx.fillStyle = "#5c1f38";
  ctx.font = "bold 54px Georgia, serif";
  ctx.fillText(`${input.dari || "Kamu"} & ${input.ke || "Dia"}`, centerX, cursorY);
  cursorY += subtitleGap;

  ctx.fillStyle = "#d6236a";
  ctx.font = "italic 32px Georgia, serif";
  ctx.fillText("resmi memulai cerita baru 💕", centerX, cursorY);
  cursorY += dividerGap;

  ctx.strokeStyle = "#ffc7da";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX - 60, cursorY);
  ctx.lineTo(centerX + 60, cursorY);
  ctx.stroke();
  cursorY += toMessageGap;

  ctx.fillStyle = "#5c1f38";
  ctx.font = "italic 30px Georgia, serif";
  ctx.textAlign = "left";
  lines.forEach((l, i) => ctx.fillText(l, cardX + innerPad, cursorY + i * msgLineHeight));
  cursorY += msgHeight + toTagGap;

  ctx.textAlign = "center";
  ctx.font = "bold 24px Poppins, Arial, sans-serif";
  ctx.fillStyle = "#b9822c";
  ctx.fillText(`${input.vibeEmoji} ${input.vibeLabel.toUpperCase()}`, centerX, cursorY);

  ctx.save();
  ctx.shadowColor = "rgba(214,35,106,0.25)";
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 3;
  ctx.font = "bold 26px Poppins, Arial, sans-serif";
  ctx.fillStyle = "#b0446f";
  ctx.fillText("✉ Amplop Cinta", centerX, H - 160);
  ctx.restore();
  ctx.font = "20px Poppins, Arial, sans-serif";
  ctx.fillStyle = "#c78ea3";
  ctx.fillText("4uonly.vercel.app", centerX, H - 120);

  return canvas.toDataURL("image/png");
}
