import { Hero } from "@/components/home/Hero";
import { ProgramSection } from "@/components/home/ProgramSection";
import { KeunggulanSection } from "@/components/home/KeunggulanSection";
import { GaleriSection } from "@/components/home/GaleriSection";
import { site } from "@/lib/site";

export const metadata = {
  title: "Beranda",
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProgramSection />
      <KeunggulanSection />
      <GaleriSection />
    </>
  );
}
