import Image from "next/image";
import { societies, type Society } from "@/lib/data";

function SocietyCard({ society, affinity = false }: { society: Society; affinity?: boolean }) {
  return (
    <a
      className={`soc-card spot${affinity ? " soc-card-affinity" : ""}`}
      href={society.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${society.name} — official website (opens in a new tab)`}
    >
      <div className="soc-logo">
        <Image src={society.logo} alt="" width={420} height={220} sizes="(max-width: 700px) 70vw, 280px" />
      </div>
      <div className="soc-body">
        <h3>{society.name}</h3>
        <p>{society.desc}</p>
        <span className="soc-link">Official website ↗</span>
      </div>
    </a>
  );
}

export default function SocietiesShowcase() {
  const technical = societies.filter((s) => s.kind === "society");
  const affinity = societies.filter((s) => s.kind === "affinity");

  return (
    <section className="soc-section" id="societies" aria-labelledby="societies-title">
      <div className="container">
        <div className="soc-head" data-reveal="stagger">
          <div className="eyebrow">IEEE Societies</div>
          <h2 className="section-title" id="societies-title">
            Our societies.
          </h2>
          <p className="section-copy">
            {technical.length} technical societies and {affinity.length} affinity group, bringing the breadth of IEEE to the Saintgits
            community.
          </p>
        </div>

        <div className="soc-grid" data-reveal="stagger">
          {technical.map((s) => (
            <SocietyCard society={s} key={s.code} />
          ))}
        </div>

        {affinity.length > 0 && (
          <>
            <div className="soc-subhead" data-reveal="up">
              Affinity group
            </div>
            <div className="soc-grid soc-grid-affinity" data-reveal="stagger">
              {affinity.map((s) => (
                <SocietyCard society={s} key={s.code} affinity />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
