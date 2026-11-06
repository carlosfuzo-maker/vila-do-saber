import type { Metadata, Viewport } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { PwaServiceWorkerRegistration } from "./components/PwaManager";

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
  themeColor: "#020617",
};

export const metadata: Metadata = {
  title: "Vila do Saber • Pokémon FireRed RPG",
  description: "Mundo RPG Escolar gamificado para Bianca e Cecília",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
        className="min-h-full font-[family-name:var(--font-fredoka)] bg-slate-950 text-slate-100 antialiased selection:bg-pink-300 selection:text-pink-900"
        suppressHydrationWarning
      >
        <PwaServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
