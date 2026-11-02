import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "./content";
import { Wordmark } from "./Wordmark";

const balls = [
  { color: "#133EFF", x: "2%", delay: 0 },
  { color: "#133EFF", x: "9%", delay: 0.04 },
  { color: "#133EFF", x: "16%", delay: 0.02 },
  { color: "#FF3C02", x: "24%", delay: 0.07 },
  { color: "#02C157", x: "32%", delay: 0.01 },
  { color: "#02C157", x: "39%", delay: 0.05 },
  { color: "#E5FF00", x: "47%", delay: 0.03 },
  { color: "#E5FF00", x: "54%", delay: 0.06 },
  { color: "#FF85CE", x: "62%", delay: 0.02 },
  { color: "#FF85CE", x: "70%", delay: 0.08 },
  { color: "#6DCBFE", x: "78%", delay: 0.04 },
  { color: "#6DCBFE", x: "85%", delay: 0.01 },
  { color: "#6DCBFE", x: "93%", delay: 0.05 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.08, 0.16], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.16], [0, -30]);
  const markY = useTransform(scrollYProgress, [0, 0.22, 0.4, 0.5], ["0vh", "-38vh", "-38vh", "-70vh"]);
  const markColor = useTransform(scrollYProgress, [0.08, 0.2], ["#111111", "#8a8a8a"]);
  const markOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);
  const ballOpacity = useTransform(scrollYProgress, [0.12, 0.22, 0.4, 0.5], [0, 1, 1, 0]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const companyOpacity = useTransform(scrollYProgress, [0.5, 0.62], [0, 1]);
  const companyY = useTransform(scrollYProgress, [0.5, 0.64], [40, 0]);
  const bg = useTransform(scrollYProgress, [0.7, 0.86], ["#ffffff", "#1a1a1a"]);
  const copyColor = useTransform(scrollYProgress, [0.72, 0.86], ["#161616", "#ffffff"]);
  const muted = useTransform(scrollYProgress, [0.72, 0.86], ["rgba(22,22,22,0.62)", "rgba(255,255,255,0.72)"]);

  return (
    <section ref={ref} className="opening" id="company">
      <div className="opening-sticky">
        <motion.div className="opening-bg" style={{ backgroundColor: bg }} />

        <motion.div className="hero-copy" style={{ opacity: titleOpacity, y: titleY }}>
          <h1>Build for the Real.</h1>
          <p className="jp hero-jp">
            リアルのためのデジタルを追求し、
            <br />
            手触りのある人間らしい社会を実現する
          </p>
        </motion.div>

        <motion.a className="scroll-down" href="#company" style={{ opacity: scrollOpacity }}>
          Scroll Down
        </motion.a>

        <motion.div className="logo-layer" style={{ y: markY, x: "-50%", opacity: markOpacity }}>
          <motion.div className="balls" style={{ opacity: ballOpacity }}>
            {balls.map((ball, index) => (
              <Ball key={index} progress={scrollYProgress} ball={ball} />
            ))}
          </motion.div>
          <motion.div style={{ color: markColor }}>
            <Wordmark fluid color="currentColor" className="hero-word" />
          </motion.div>
        </motion.div>

        <motion.div className="company-layer" style={{ opacity: companyOpacity, y: companyY, color: copyColor }}>
          <p className="kicker">( Company )</p>
          <h2 className="jp-display">
            リアルのためのデジタルを追求し、
            <br />
            手触りのある人間らしい社会を実現する
          </h2>
          <motion.div className="company-copy jp" style={{ color: muted }}>
            <p>
              ミッション実現を目指し、
              <br />
              オールジャンル動画講座サービス『ミルーム』を提供しています。
            </p>
            <p>
              ミルームは、AIが人間の活動を少しずつ置き換え、再定義していく時代において、
              <br />
              人々が自分の身体や感覚を使い、
              <br />
              日常の中で何かに没頭する時間をつくるためのプロダクトです。
            </p>
            <p>
              特定のジャンルに閉じることなく、肩肘張った学びでもなく、
              <br />
              あらゆる領域でリアルのためのデジタルを追求することで、
              <br />
              一人ひとりの「自分の時間」を豊かにしていきます。
            </p>
          </motion.div>
          <a className="more" href={`${site}/company`}>
            <span className="more-dot">›</span>
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Ball({
  progress,
  ball,
}: {
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  ball: (typeof balls)[number];
}) {
  const start = 0.18 + ball.delay;
  const y = useTransform(progress, [start, start + 0.1, start + 0.16, start + 0.22], [-260, 18, -10, 0]);
  return <motion.span className="ball" style={{ background: ball.color, left: ball.x, y }} />;
}
