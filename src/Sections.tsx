import { useEffect, useRef, useState } from "react";
import { experiences, news, site, steps } from "./content";

export function Gallery() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>(experiences[0].title);
  const cards = [...experiences, ...experiences, ...experiences];

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let offset = 0;
    let frame = 0;
    let lastTitle = "";
    const tick = () => {
      if (!reduce) offset += 0.85;
      const stage = stageRef.current;
      if (stage) {
        const kids = [...stage.children] as HTMLElement[];
        const width = stage.clientWidth;
        const spacing = Math.min(400, Math.max(280, width * 0.3));
        const total = kids.length * spacing;
        let nearest = 99999;
        let title = lastTitle;
        kids.forEach((el, index) => {
          let x = ((index * spacing - offset) % total + total) % total;
          if (x > total / 2) x -= total;
          const n = x / (width * 0.5);
          const y = Math.abs(n) * 10;
          const rot = n * -2.5;
          const scale = Math.max(0.82, 1 - Math.abs(n) * 0.12);
          el.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`;
          el.style.opacity = "1";
          el.style.zIndex = String(100 - Math.round(Math.abs(x)));
          if (Math.abs(x) < nearest) {
            nearest = Math.abs(x);
            title = el.dataset.title || title;
          }
        });
        if (title && title !== lastTitle) {
          lastTitle = title;
          setActive(title);
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="gallery-wrap" aria-label="Curved card gallery">
      <div className="sheet">
        <h2 className="sheet-title">3,000+ Experiences</h2>
        <p className="sheet-quote">"Fasilitas"</p>
        <p className="sheet-body">
          Miroom brings people closer to inspiring creators through online experiences that spark new interests and
          help them take root in everyday life.
        </p>
        <div className="stage" ref={stageRef}>
          {cards.map((item, index) => (
            <article key={`${item.title}-${index}`} className="exp-card" data-title={item.title}>
              <img src={item.src} alt="" />
              <p>
                <i style={{ background: item.dot }} />
                {item.title}
              </p>
            </article>
          ))}
        </div>
        <p className="my-time">My Time For</p>
        <p className="paren">
          <span>(</span>
          <span className="paren-word">{active}</span>
          <span>)</span>
        </p>
      </div>
    </section>
  );
}

export function Product() {
  return (
    <section id="product" className="product">
      <div className="product-copy">
        <p className="kicker">( Our Product )</p>
        <h2 className="jp-display left">
          好きなことから、役立つことまで。
          <br />
          オールジャンル動画講座サービス
          <br />
          『ミルーム』
        </h2>
        <p className="jp left-copy">
          ミルームは、様々なジャンルの動画講座を定額で受講することができるサブスクリプションサービスです。
          <br />
          多様なクリエイターによる3,000以上の講座と、材料・道具が揃った「キット」をお届けすることで、
          <br />
          誰もが自分のペースで好きなことに没頭できる環境を提供しています。
        </p>
        <a className="more" href={`${site}/product`}>
          <span className="more-dot">›</span>
          Learn More
        </a>
      </div>
      <div className="orbits" aria-hidden>
        {steps.map((step, index) => (
          <div key={step} className="orbit">
            <span>0{index + 1}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

const filters = ["Semua", "Program", "Lembaga"] as const;

export function News() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Semua");
  const items = news.filter((item) => filter === "Semua" || item.tag === filter);

  return (
    <section id="news" className="news">
      <div className="news-head">
        <p className="kicker dark">( Berita )</p>
        <div className="filters">
          {filters.map((item) => (
            <button key={item} type="button" className={item === filter ? "on" : ""} onClick={() => setFilter(item)}>
              {item}
            </button>
          ))}
        </div>
        <a className="more dark" href={`${site}/news`}>
          <span className="more-dot">›</span>
          Learn More
        </a>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            <a href={item.href}>
              <span>{item.date}</span>
              <em>{item.tag}</em>
              <strong>{item.title}</strong>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Careers() {
  return (
    <section id="careers" className="careers">
      <img src="/careers.png" alt="" />
      <h2>
        Siapkan Langkahmu.
        <br />
        Kuatkan Bahasamu.
        <br />
        Raih Karier di Jepang.
      </h2>
      <a className="touch" href="https://wa.me/6285795838179?text=Halo%20kak%20saya%20mau%20bertanya%20perihal%20LPK%20HANA" target="_blank" rel="noopener noreferrer">
        <div>
          <p className="jp-display left small">Tanya langsung soal LPK.</p>
          <p className="jp left-copy">
            Dari pilihan jalur sampai syarat keberangkatan, tim Hana Karya siap membantu Anda memahaminya.
            <br />
            Tekan Daftar dan kirim chat. Kami balas lewat WhatsApp.
          </p>
        </div>
        <span>
          Daftar
          <i>›</i>
        </span>
      </a>
    </section>
  );
}
