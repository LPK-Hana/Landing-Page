import { Hero } from "@/components/home/Hero";
import { ProgramStrip } from "@/components/home/ProgramStrip";
import { ProgramSection } from "@/components/home/ProgramSection";
import { KeunggulanSection } from "@/components/home/KeunggulanSection";
import { AlurSection } from "@/components/home/AlurSection";
import { PelatihanSection } from "@/components/home/PelatihanSection";
import { GaleriSection } from "@/components/home/GaleriSection";
import { ClosingCta } from "@/components/home/ClosingCta";
import { site } from "@/lib/site";

export const metadata = {
  title: {
    absolute: "LPK Hana Karya - Program Magang & Tokutei Ginou Jepang",
  },
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProgramStrip />
      <KeunggulanSection />
      <ProgramSection />
      <AlurSection />
      <PelatihanSection />
      <GaleriSection />
      <ClosingCta />
    </>
  );
}
