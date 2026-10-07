import { hanaAppUrl } from "@/lib/hana-app";

/** Brand & media paths for LPK Hana Karya landing (served from /media/...). */
export const site = {
  name: "LPK Hana Karya Career Center",
  shortName: "Hana Karya",
  tagline: "Bersama Meraih Masa Depan di Jepang",
  sloganJp: "学びで、未来をつくる",
  description:
    "LPK Hana Karya Career Center — pelatihan bahasa Jepang, pemberkasan, dan pendampingan magang/kerja ke Jepang.",
  phone: "085795838179",
  email: "hanakaryacc@gmail.com",
  values: ["Discipline", "Skill", "Opportunity", "Brighter Future"] as const,
  media: {
    logoBanner: "/media/logo-banner-top.png",
    logoEmblem: "/media/logo-emblem.png",
    logoEmblemRb: "/media/logo-emblem-rb.png",
    heroBackground: "/media/background-web-1.jpg",
    siswaKeJepang: "/media/siswa-ke-jepang.png",
  },
  nav: [
    { href: "/", label: "Beranda" },
    { href: "/#program", label: "Program" },
    { href: "/#keunggulan", label: "Keunggulan" },
    { href: "/#galeri", label: "Galeri" },
    { href: "/#kontak", label: "Kontak" },
  ] as const,
  cta: {
    selengkapnya: "/#program",
    daftar: () => `${hanaAppUrl()}/register`,
    masuk: () => `${hanaAppUrl()}/`,
  },
} as const;

export type SiteNavItem = (typeof site.nav)[number];
