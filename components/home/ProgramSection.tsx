import { site } from "@/lib/site";

const programs = [
  {
    kanji: "特定技能",
    tag: "SSW",
    title: "Tokutei Ginou",
    body: "Visa kerja untuk tenaga berketerampilan di sektor industri tertentu, dengan kontrak kerja langsung bersama perusahaan Jepang.",
  },
  {
    kanji: "技能実習",
    tag: "Magang",
    title: "Ginou Jisshusei",
    body: "Program pemagangan teknis untuk mempelajari keterampilan kerja langsung di lingkungan industri Jepang.",
  },
  {
    kanji: "育成就労",
    tag: "Sistem Baru",
    title: "Ikuseishuro",
    body: "Sistem pembinaan tenaga kerja terbaru pengganti Ginou Jisshusei. Kami sudah siap mendampingi Anda di jalur ini.",
  },
] as const;

export function ProgramSection() {
  return (
    <section className="section" id="program">
      <div className="section__inner">
        <header className="section__head">
          <p className="section__kicker">プログラム</p>
          <h2>Jalur Program ke Jepang</h2>
        </header>
        <ul className="pathway-list">
          {programs.map((program) => (
            <li key={program.title}>
              <span className="pathway-list__tag">{program.tag}</span>
              <p className="pathway-list__kanji">{program.kanji}</p>
              <h3>{program.title}</h3>
              <p>{program.body}</p>
            </li>
          ))}
        </ul>
        <div className="section__cta">
          <a href={site.cta.daftar()} className="btn btn--primary">
            Daftar Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
