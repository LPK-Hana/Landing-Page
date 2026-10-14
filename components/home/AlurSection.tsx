const steps = [
  { kanji: "登録", title: "Daftar Online", body: "Buat akun dan lengkapi data diri langsung dari web." },
  { kanji: "研修", title: "Pelatihan Intensif", body: "Bahasa, etos kerja, dan fisik selama 2–4 bulan." },
  { kanji: "面接", title: "Mensetsu", body: "Wawancara langsung dengan perusahaan Jepang." },
  { kanji: "出発", title: "Berangkat", body: "Dokumen diurus, Anda siap terbang ke Jepang." },
] as const;

export function AlurSection() {
  return (
    <section className="section section--alt" id="alur">
      <div className="section__inner">
        <header className="section__head">
          <p className="section__kicker">ステップ</p>
          <h2>Alur Menuju Jepang</h2>
        </header>
        <ol className="steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="steps__mark">{step.kanji}</span>
              <p className="steps__index">Langkah {index + 1}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
