import { hanaAppUrl } from "@/lib/hana-app";

/** Brand & media paths for LPK Hana Karya landing (served from /media/...). */
export const site = {
  name: "LPK Hana Karya Career Center",
  shortName: "Hana Karya",
  tagline: "Bersama Meraih Masa Depan di Jepang",
  sloganJp: "学びで、未来をつくる",
  description: "Lembaga Pelatihan Kerja resmi ke Jepang. 2-4 bulan siap wawancara.",
  hero: {
    eyebrow: "Program Magang & Tokutei Ginou Jepang",
    rank: "LPK No. 1 di Bandung",
    jp: "日本で、キャリアを築く",
    title: "Bangun Karir Anda di Jepang",
    lead: "Wujudkan mimpi bekerja di Jepang melalui pelatihan bahasa dan skill yang terstruktur, resmi, dan terbukti.",
    points: ["Pendaftaran 100% online", "Siap Mensetsu 2–4 bulan", "SSW · Jisshusei · Ikuseishuro"],
  },
  phone: "085282541939",
  email: "hanakaryacc@gmail.com",
  maps: {
    name: "LPK Hana Karya",
    lat: -6.9887534,
    lng: 107.6469491,
    url: "https://maps.app.goo.gl/Lt39z4DwDNhNWLhD8",
  },
  values: ["Discipline", "Skill", "Opportunity", "Brighter Future"] as const,
  media: {
    logoBanner: "/media/logo-banner-top.png",
    logoEmblem: "/media/logo-emblem.png",
    logoEmblemRb: "/media/logo-emblem-rb.png",
    heroBackground: "/media/background-web-1.jpg",
    siswaKeJepang: "/media/siswa-ke-jepang.png",
  },
  nav: [
    { href: "/#program", label: "Program" },
    { href: "/#keunggulan", label: "Keunggulan" },
    { href: "/#alur", label: "Alur" },
    { href: "/#pelatihan", label: "Pelatihan" },
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
