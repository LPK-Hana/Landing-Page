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
        <p className="hero__chip">{site.hero.eyebrow}</p>
        <p className="hero__rank">{site.hero.rank}</p>
        <p className="hero__jp">{site.hero.jp}</p>
        <h1 className="hero__title">{site.hero.title}</h1>
        <p className="hero__lead">{site.hero.lead}</p>
        <div className="hero__actions">
          <a href={site.cta.daftar()} className="btn btn--primary">
            Daftar Sekarang
          </a>
          <a href={site.cta.selengkapnya} className="btn btn--light">
            Lihat Program
          </a>
        </div>
        <ul className="hero__points">
          {site.hero.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
