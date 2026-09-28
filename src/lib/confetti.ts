const COLORS = ["#f26a21", "#ffb27a", "#f5f0e8", "#111820", "#7cc576"];

export function confettiBurst(origin?: Element | null) {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const rect = origin?.getBoundingClientRect();
  const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 3;

  const layer = document.createElement("div");
  layer.className = "confetti-layer";
  document.body.appendChild(layer);

  const count = 26;
  let remaining = count;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.background = COLORS[i % COLORS.length];
    piece.style.left = `${x}px`;
    piece.style.top = `${y}px`;
    layer.appendChild(piece);

    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
    const distance = 90 + Math.random() * 130;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance - 60;
    const rot = (Math.random() - 0.5) * 720;
    const duration = 900 + Math.random() * 500;

    const anim = piece.animate(
      [
        { transform: "translate(-50%, -50%) rotate(0deg) scale(1)", opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + 220}px)) rotate(${rot}deg) scale(0.7)`, opacity: 0 },
      ],
      { duration, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" }
    );

    anim.onfinish = () => {
      piece.remove();
      remaining -= 1;
      if (remaining <= 0) layer.remove();
    };
  }
}
