import { faqs } from "@/lib/content";

export default function Faq() {
  return (
    <div className="faq" data-reveal="stagger">
      {faqs.map((item) => (
        <details className="faq-item" name="faq" key={item.q}>
          <summary>
            <span>{item.q}</span>
            <span className="faq-icon" aria-hidden="true" />
          </summary>
          <div className="faq-body">
            <p>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
