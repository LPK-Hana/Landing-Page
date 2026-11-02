import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

type Phase = "play" | "leave" | "done";

export function Intro() {
  const lenis = useLenis();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("play");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase("done");
      return;
    }
    const start = performance.now();
    let frame = 0;
    let timer = 0;
    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - start) / 1400) * 100));
      setProgress(next);
      if (next < 100) {
        frame = requestAnimationFrame(tick);
        return;
      }
      setPhase("leave");
      timer = window.setTimeout(() => setPhase("done"), 420);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (phase === "done") lenis.start();
    else lenis.stop();
  }, [lenis, phase]);

  if (phase === "done") return null;

  return (
    <div className={`intro ${phase === "leave" ? "intro-leave" : ""}`} aria-hidden>
      <p className="intro-brand">MIROOM</p>
      <div>
        <span className="intro-dot" />
        <p className="intro-count">{progress}%</p>
      </div>
    </div>
  );
}
