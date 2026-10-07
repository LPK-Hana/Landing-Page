import Image from "next/image";
import { site } from "@/lib/site";

export function GaleriSection() {
  return (
    <section className="section" id="galeri">
      <div className="section__inner">
        <header className="section__head">
          <h2>Galeri keberangkatan</h2>
          <p>Jejak siswa Hana Karya menuju Jepang.</p>
        </header>
        <figure className="galeri-hero">
          <Image
            src={site.media.siswaKeJepang}
            alt="Siswa LPK Hana Karya dengan banner selamat berangkat"
            width={1672}
            height={941}
            className="galeri-hero__img"
            sizes="(max-width: 960px) 100vw, 960px"
          />
          <figcaption>{site.tagline}</figcaption>
        </figure>
      </div>
    </section>
  );
}
