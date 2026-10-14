const points = [
  "Bahasa Jepang terstruktur dari dasar hingga siap wawancara",
  "Rutinitas olahraga untuk ketahanan fisik",
  "Disiplin waktu, sikap, dan tata krama kerja ala Jepang",
] as const;

export function PelatihanSection() {
  return (
    <section className="section" id="pelatihan">
      <div className="section__inner split">
        <div>
          <header className="section__head section__head--left">
            <p className="section__kicker">規律・礼儀・忍耐</p>
            <h2>Mental & Fisik Sekuat Baja</h2>
          </header>
          <p className="split__lead">
            Tidak hanya sekadar bahasa, kami membentuk kedisiplinan, mental, dan ketahanan fisik siswa. Rutinitas
            olahraga dan kedisiplinan ala Jepang memastikan Anda siap menghadapi budaya kerja profesional di sana.
          </p>
          <ul className="split__points">
            {points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
        <aside className="discipline">
          <p className="discipline__jp">規律</p>
          <p className="discipline__label">Discipline</p>
          <p>Olahraga, sikap, dan ketepatan waktu dilatih setiap hari sampai siap menghadapi budaya kerja di Jepang.</p>
        </aside>
      </div>
    </section>
  );
}
