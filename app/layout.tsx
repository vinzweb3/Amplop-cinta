import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://4uonly.vercel.app"),
  title: "Amplop Cinta",
  description: "Segel perasaan lo. Kirim ke dia. Biar dia yang buka sendiri amplopnya.",
  openGraph: {
    title: "Amplop Cinta",
    description: "Segel perasaan lo. Kirim ke dia. Biar dia yang buka sendiri amplopnya.",
    url: "https://dearyou.vercel.app",
    siteName: "Amplop Cinta",
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#150a0f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
