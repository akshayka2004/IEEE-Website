import type { TimelineItem } from "@/lib/content";

export default function Timeline({ items }: { items: TimelineItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="timeline-section" id="timeline" aria-labelledby="timeline-title">
      <div className="container">
        <div data-reveal="stagger">
          <div className="eyebrow">Our journey</div>
          <h2 className="section-title" id="timeline-title">
            How we got here.
          </h2>
        </div>

        <ol className="timeline" data-reveal="stagger">
          {items.map((item, i) => (
            <li className={`timeline-item ${i % 2 === 0 ? "is-left" : "is-right"}`} key={item.title}>
              <span className="timeline-dot" aria-hidden="true" />
              <div className="timeline-card">
                <span className="timeline-when">{item.when}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
