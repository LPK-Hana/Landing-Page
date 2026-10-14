const points = [
  {
    title: "Hanya 2-4 Bulan Siap Mensetsu",
    body: "Kurikulum intensif kami dirancang agar Anda menguasai bahasa dan etos kerja Jepang dalam waktu singkat. Dalam 2 hingga 4 bulan, Anda sudah siap mengikuti Mensetsu (wawancara dengan perusahaan Jepang).",
    lead: true,
  },
  {
    title: "Pilihan Program Terlengkap & Up-to-Date",
    body: "Kami memfasilitasi jalur Tokutei Ginou (SSW), Ginou Jisshusei, dan telah sepenuhnya siap mengimplementasikan sistem terbaru Ikuseishuro.",
  },
  {
    title: "Pendaftaran 100% Online",
    body: "Tinggalkan proses administrasi yang rumit. Cukup mendaftar via web, tim kami akan langsung mendampingi langkah Anda.",
  },
] as const;

export function KeunggulanSection() {
  return (
    <section className="section section--alt" id="keunggulan">
      <div className="section__inner">
        <header className="section__head">
          <p className="section__kicker">選ばれる理由</p>
          <h2>Mengapa Memilih Kami?</h2>
        </header>
        <div className="bento">
          {points.map((point) => (
            <article key={point.title} className={point.lead ? "bento__card bento__card--lead" : "bento__card"}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
              {point.lead ? (
                <div className="bento__meter" aria-hidden>
                  <div className="bento__meter-labels">
                    <span>Bulan 1</span>
                    <span>Bulan 4</span>
                  </div>
                  <div className="bento__meter-bar" />
                  <div className="bento__meter-labels bento__meter-labels--end">
                    <span>Bahasa dasar</span>
                    <span>Etos kerja</span>
                    <span>Siap Mensetsu</span>
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
