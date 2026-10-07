const points = [
  {
    title: "Fokus Jepang",
    body: "Kurikulum dan budaya kerja diarahkan ke kebutuhan lapangan di Jepang.",
  },
  {
    title: "Pendampingan nyata",
    body: "Tim mendampingi pemberkasan dan tahapan seleksi, bukan hanya teori kelas.",
  },
  {
    title: "Komunitas berangkat",
    body: "Siswa dilatih bersama dan didukung hingga momen keberangkatan.",
  },
] as const;

export function KeunggulanSection() {
  return (
    <section className="section section--alt" id="keunggulan">
      <div className="section__inner">
        <header className="section__head">
          <h2>Kenapa Hana Karya</h2>
          <p>Discipline · Skill · Opportunity · Brighter Future</p>
        </header>
        <ul className="feature-list">
          {points.map((p) => (
            <li key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
