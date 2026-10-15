import Image from "next/image";
import { societies } from "@/lib/data";

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="soc-marquee-row" aria-hidden={hidden || undefined}>
      {societies.map((s) => (
        <li key={s.code}>
          <a
            className="soc-marquee-item"
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={hidden ? -1 : undefined}
            aria-label={`${s.name} — official website (opens in a new tab)`}
          >
            <span className="soc-marquee-logo">
              <Image src={s.logo} alt="" width={240} height={120} sizes="160px" />
            </span>
            <span className="soc-marquee-name">{s.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function SocietiesMarquee() {
  return (
    <section className="soc-marquee" aria-labelledby="soc-marquee-title">
      <div className="container soc-marquee-head" data-reveal="stagger">
        <div className="eyebrow">IEEE Societies</div>
        <h2 className="section-title" id="soc-marquee-title">
          Our societies.
        </h2>
      </div>
      <div className="soc-marquee-viewport">
        <div className="soc-marquee-track">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
