const items = [
  "特定技能 · Tokutei Ginou",
  "技能実習 · Ginou Jisshusei",
  "育成就労 · Ikuseishuro",
  "面接 · Mensetsu",
  "日本語 · Bahasa Jepang",
  "規律 · Disiplin",
] as const;

export function ProgramStrip() {
  const loop = [...items, ...items];

  return (
    <div className="program-strip" aria-hidden>
      <div className="program-strip__track">
        {loop.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
