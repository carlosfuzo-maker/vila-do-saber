import type { Metadata, Viewport } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0284c7",
};

export const metadata: Metadata = {
  title: "Vila do Saber - Mapa da Aventura",
  description: "Ambiente educacional gamificado para Bianca e Cecília",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Vila do Saber",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${fredoka.variable} h-full`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full font-[family-name:var(--font-fredoka)] bg-sky-100 text-slate-800 antialiased selection:bg-pink-300 selection:text-pink-900"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
