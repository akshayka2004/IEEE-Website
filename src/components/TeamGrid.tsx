import Img from "./Img";
import type { Person } from "@/lib/data";

export default function TeamGrid({ people, sizes = "(max-width: 700px) 50vw, 25vw" }: { people: Person[]; sizes?: string }) {
  return (
    <div className="people" data-reveal="stagger">
      {people.map((person) => (
        <article className="person spot tilt member-card" key={person.name}>
          <div className="person-photo shimmer">
            <Img src={person.image} alt={`${person.name}, ${person.role}`} width={800} height={1000} sizes={sizes} />
          </div>
          <div className="person-info">
            <div className="person-name">{person.name}</div>
            <div className="person-role">{person.role}</div>
          </div>
        </article>
      ))}
    </div>
  );
}
