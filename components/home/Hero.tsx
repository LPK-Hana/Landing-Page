import Image from "next/image";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="hero">
      <Image
        src={site.media.heroBackground}
        alt="Siswa LPK Hana Karya siap berangkat ke Jepang"
        fill
        priority
        className="hero__bg"
        sizes="100vw"
      />
      <div className="hero__veil" aria-hidden />
      <div className="hero__content">
        <p className="hero__brand">{site.name}</p>
        <h1 className="hero__title">{site.tagline}</h1>
        <p className="hero__lead">
          Pelatihan bahasa Jepang, pemberkasan, dan pendampingan hingga
          keberangkatan magang & karier di Jepang.
        </p>
        <div className="hero__actions">
          <a href={site.cta.selengkapnya} className="btn btn--light">
            Selengkapnya
          </a>
          <a href={site.cta.daftar()} className="btn btn--primary">
            Daftar Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
