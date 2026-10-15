import Img from "@/components/Img";
import { execom } from "@/lib/data";

/** Featured card for the Branch Counselor, shown above the office bearers. */
export default function BranchCounselor() {
  const person = execom.find((p) => p.role === "Branch Counselor");
  if (!person) return null;

  return (
    <article className="counselor-card spot" data-reveal="up">
      <div className="counselor-photo shimmer">
        <Img src={person.image} alt={`${person.name}, ${person.role}`} width={800} height={1000} sizes="(max-width: 700px) 40vw, 180px" />
      </div>
      <div className="counselor-copy">
        <div className="eyebrow">Branch Counselor</div>
        <h3 className="counselor-name">{person.name}</h3>
        <p>
          Guiding the IEEE Student Branch at Saintgits College of Engineering, and supporting our students in turning
          ideas into meaningful impact.
        </p>
      </div>
    </article>
  );
}
