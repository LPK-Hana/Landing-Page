import { site } from "@/lib/site";

export function ClosingCta() {
  return (
    <section className="closing">
      <p className="closing__jp">一緒に始めましょう</p>
      <h2>Siap Melangkah ke Jepang?</h2>
      <p>Daftar sekarang secara online. Tim kami akan mendampingi dari pelatihan pertama sampai hari keberangkatan.</p>
      <div className="closing__actions">
        <a href={site.cta.daftar()} className="btn btn--light">
          Daftar Sekarang
        </a>
        <a href={site.cta.masuk()} className="btn btn--ghost">
          Login Siswa
        </a>
      </div>
    </section>
  );
}
