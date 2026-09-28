"use client";

import { useEffect, useState } from "react";

function parts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export default function Countdown({ target, className = "" }: { target: string; className?: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  const diff = now === null ? null : new Date(target).getTime() - now;
  const started = diff !== null && diff <= 0;
  const p = parts(diff ?? 0);
  const cells: [string, number][] = [
    ["Days", p.days],
    ["Hours", p.hours],
    ["Mins", p.minutes],
    ["Secs", p.seconds],
  ];

  if (started) {
    return <div className={`countdown countdown-started ${className}`}>Happening now</div>;
  }

  return (
    <div className={`countdown ${className}`} role="timer" aria-label="Time until the event starts">
      {cells.map(([label, value]) => (
        <div className="countdown-cell" key={label}>
          <span className="countdown-num" suppressHydrationWarning>
            {diff === null ? "--" : String(value).padStart(2, "0")}
          </span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
