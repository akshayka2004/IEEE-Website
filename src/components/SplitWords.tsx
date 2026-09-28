export default function SplitWords({ text, startDelay = 0.15, step = 0.08 }: { text: string; startDelay?: number; step?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span className="split-word" key={`${w}-${i}`}>
          <span className="split-word-inner" style={{ animationDelay: `${startDelay + i * step}s` }}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </>
  );
}
