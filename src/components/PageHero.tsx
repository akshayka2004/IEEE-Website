import Image from "next/image";
import SplitWords from "./SplitWords";

export default function PageHero({
  kicker,
  title,
  desc,
  image,
}: {
  kicker: string;
  title: string;
  desc: string;
  image: string;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-bg">
        <Image src={image} alt="" fill sizes="100vw" priority style={{ objectFit: "cover" }} />
      </div>
      <div className="container page-hero-content">
        <div className="eyebrow" style={{ color: "#ff9a61" }}>
          {kicker}
        </div>
        <h1 className="split-heading">
          <SplitWords text={title} />
        </h1>
        <p>{desc}</p>
      </div>
    </section>
  );
}
