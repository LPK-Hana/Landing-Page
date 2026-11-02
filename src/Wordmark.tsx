import type { CSSProperties } from "react";
import { letters } from "./content";

type Props = {
  height?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
  fluid?: boolean;
};

const mask = (src: string, color: string): CSSProperties => ({
  display: "block",
  background: color,
  WebkitMaskImage: `url(${src})`,
  maskImage: `url(${src})`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "100% 100%",
  maskSize: "100% 100%",
  WebkitMaskPosition: "center",
  maskPosition: "center",
});

export function Wordmark({ height = 219, color = "#111", className, style, fluid = false }: Props) {
  if (fluid) {
    return (
      <div className={className} style={{ display: "flex", width: "100%", alignItems: "flex-end", gap: "1%", ...style }} aria-hidden>
        {letters.map((letter, index) => (
          <span
            key={`${letter.src}-${index}`}
            style={{
              ...mask(letter.src, color),
              flex: `${letter.ratio} 1 0`,
              aspectRatio: `${letter.ratio}`,
              minWidth: 0,
            }}
          />
        ))}
      </div>
    );
  }

  const gap = height * (10 / 219);
  return (
    <div className={className} style={{ display: "flex", alignItems: "flex-end", gap, ...style }} aria-hidden>
      {letters.map((letter, index) => (
        <span
          key={`${letter.src}-${index}`}
          style={{ ...mask(letter.src, color), height, width: height * letter.ratio }}
        />
      ))}
    </div>
  );
}
