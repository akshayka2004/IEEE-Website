import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { gallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery | IEEE Student Branch",
  description: "Moments from IEEE Student Branch events, workshops and community activities.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <main id="main">
      <PageHero
        kicker="Gallery"
        title="Moments that matter."
        desc="A glimpse into our events, workshops, competitions and community activities."
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=2200&q=85"
      />

      <section className="gallery">
        <div className="container">
          <GalleryGrid photos={gallery} />
        </div>
      </section>
    </main>
  );
}
