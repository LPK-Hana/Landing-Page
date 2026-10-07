import { site } from "@/lib/site";

const programs = [
  {
    title: "Pelatihan Bahasa Jepang",
    body: "Kelas terarah agar siap komunikasi dan seleksi di Jepang.",
  },
  {
    title: "Pemberkasan Keberangkatan",
    body: "Dokumen dan administrasi dipandu sampai lengkap.",
  },
  {
    title: "Pendampingan hingga Berangkat",
    body: "Dampingan proses seleksi, MCU, hingga hari keberangkatan.",
  },
  {
    title: "Peluang Karier di Jepang",
    body: "Arahkan ke jalur magang / kerja yang sesuai kemampuan.",
  },
] as const;

export function ProgramSection() {
  return (
    <section className="section" id="program">
      <div className="section__inner">
        <header className="section__head">
          <h2>Program kami</h2>
          <p>Satu jalur jelas dari pelatihan sampai peluang di Jepang.</p>
        </header>
        <ul className="program-list">
          {programs.map((p) => (
            <li key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
        <div className="section__cta">
          <a href={site.cta.daftar()} className="btn btn--primary">
            Mulai daftar
          </a>
        </div>
      </div>
    </section>
  );
}
