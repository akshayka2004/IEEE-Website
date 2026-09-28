import Link from "next/link";
import { societies } from "@/lib/data";

export default function SocietiesMarquee() {
  const doubled = [...societies, ...societies];

  return (
    <section className="societies" id="societies" aria-labelledby="societies-title">
      <div className="container">
        <div className="societies-head">
          <div>
            <div className="eyebrow">Societies ·</div>
            <h2 className="section-title" id="societies-title">
              Explore our communities.
            </h2>
            <p className="section-copy">Special interest groups. Shared passion. Greater impact.</p>
          </div>
          <Link href="/societies" className="btn btn-dark">
            View All →
          </Link>
        </div>
      </div>

      <div className="society-track">
        {doubled.map((society, i) => (
          <div
            className="society-wrap"
            key={`${society.code}-${i}`}
            aria-hidden={i >= societies.length ? true : undefined}
          >
            <div>
              <div className="society-logo">{society.code}</div>
              <span className="society-name">{society.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
