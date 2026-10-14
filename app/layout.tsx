import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";
import { DeparturePopup } from "@/components/site/DeparturePopup";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <div className="site-shell">
          <Header />
          <main className="site-main">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <DeparturePopup />
        </div>
      </body>
    </html>
  );
}
