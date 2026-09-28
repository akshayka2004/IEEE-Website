import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { gallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery | IEEE Student Branch",
  description: "Moments from IEEE Student Branch events, workshops and community activities.",
};

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        kicker="Gallery"
        title="Moments that matter."
        desc="A glimpse into our events, workshops, competitions and community activities."
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2200&q=85"
      />

      <section className="gallery">
        <div className="container">
          <div className="gallery-grid-full">
            {gallery.map((item, i) => (
              <div className="gallery-item" key={i}>
                <Image src={item.image} alt="" width={900} height={220} />
                <div className="gallery-caption">{item.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
