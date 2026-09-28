import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import NewsCard from "@/components/NewsCard";
import { getNews } from "@/lib/content";

export const metadata: Metadata = {
  title: "News | IEEE Student Branch",
  description: "News, recaps and stories from the IEEE Student Branch at Saintgits College of Engineering.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  const posts = getNews();
  if (posts.length === 0) notFound();

  return (
    <main id="main">
      <PageHero
        kicker="News"
        title="Stories from the branch."
        desc="Recaps, announcements and updates from across our societies."
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=2200&q=85"
      />

      <section className="news-section">
        <div className="container">
          <h2 className="sr-only">Latest stories</h2>
          <div className="news-grid" data-reveal="stagger">
            {posts.map((post) => (
              <NewsCard post={post} key={post.slug} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
