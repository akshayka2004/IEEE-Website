import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GalleryGrid from "@/components/GalleryGrid";
import { gallery } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery | IEEE Student Branch",
  description: "Moments from IEEE Student Branch events, workshops and community activities.",
  alternates: { canonical: "/gallery" },
};

const CATEGORIES = new Set(gallery.map((p) => p.category));

export default async function GalleryPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const initialCategory = category && CATEGORIES.has(category as (typeof gallery)[number]["category"]) ? category : "All";

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
          <GalleryGrid photos={gallery} initialCategory={initialCategory} />
        </div>
      </section>
    </main>
  );
}
