import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beranda - minori.co.id",
  description:
    "SO (Sending Organization) Magang Jepang dan P3MI Tokuteiginou (SSW) Kerja di Jepang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
