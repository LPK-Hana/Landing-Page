export const site = "https://about.miroom.com";

export const letters = [
  { src: "/brand/m.png", ratio: 219 / 219 },
  { src: "/brand/i.png", ratio: 73 / 219 },
  { src: "/brand/r.png", ratio: 146 / 219 },
  { src: "/brand/o.png", ratio: 146 / 219 },
  { src: "/brand/o.png", ratio: 146 / 219 },
  { src: "/brand/m.png", ratio: 219 / 219 },
] as const;

export const experiences = [
  { title: "Cooking & Baking", src: "/gallery/cooking.png", dot: "#ff4fd8" },
  { title: "Accessory Making", src: "/gallery/accessory.png", dot: "#ff7a3c" },
  { title: "Sewing", src: "/gallery/sewing.png", dot: "#7aa2ff" },
  { title: "Illustration & Watercolor", src: "/gallery/illustration.png", dot: "#f5c542" },
  { title: "Nail Art", src: "/gallery/nail.jpg", dot: "#d8ff3e" },
  { title: "Flower Arrangement", src: "/gallery/flower.png", dot: "#d8ff3e" },
] as const;

export const slogan = "Fasilitas";

export const steps = [
  "Dapur Standar",
  "Kebersihan",
  "Ruang Kelas",
  "Area Olahraga",
  "Ruang Guru",
  "Asrama Siswa",
] as const;

export const news = [
  {
    date: "2026/09/04",
    tag: "Lembaga",
    title: "Pendaftaran pelatihan bahasa dan persiapan kerja ke Jepang dibuka di Bandung",
    href: "#berita",
  },
  {
    date: "2026/07/01",
    tag: "Program",
    title: "Lima jalur resmi dibuka, dari pemagangan hingga sekolah bahasa",
    href: "#berita",
  },
  {
    date: "2025/09/26",
    tag: "Program",
    title: "Asrama dan kelas siap menemani siswa sampai keberangkatan",
    href: "#berita",
  },
] as const;

export const menu = [
  { en: "Company", ja: "会社概要", href: `${site}/company` },
  { en: "Program", ja: "プロダクト", href: "/program" },
  { en: "News", ja: "ニュース", href: `${site}/news` },
  { en: "Careers", ja: "採用情報", href: `${site}/careers` },
] as const;
