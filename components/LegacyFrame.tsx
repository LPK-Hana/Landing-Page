type LegacyFrameProps = {
  html: string;
  title: string;
};

export function LegacyFrame({ html, title }: LegacyFrameProps) {
  return (
    <iframe
      className="legacy-frame"
      title={title}
      srcDoc={html}
    />
  );
}
