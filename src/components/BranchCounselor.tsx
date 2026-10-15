import Img from "@/components/Img";
import { execom } from "@/lib/data";

export default function BranchCounselor() {
  const person = execom.find((p) => p.role === "Branch Counselor");
  if (!person) return null;

  return (
    <section className="counselor" aria-labelledby="counselor-title">
      <div className="container counselor-inner">
        <div className="counselor-photo shimmer" data-reveal="up">
          <Img src={person.image} alt={person.name} width={800} height={1000} sizes="(max-width: 700px) 70vw, 320px" />
        </div>
        <div className="counselor-copy" data-reveal="stagger">
          <div className="eyebrow">Branch Counselor</div>
          <h2 className="section-title" id="counselor-title">
            {person.name}
          </h2>
          <p>
            Guiding the IEEE Student Branch at Saintgits College of Engineering, and supporting our students in turning
            ideas into meaningful impact.
          </p>
        </div>
      </div>
    </section>
  );
}
