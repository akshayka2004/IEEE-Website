import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Img from "@/components/Img";
import ShareButtons from "@/components/ShareButtons";
import NewsCard from "@/components/NewsCard";
import { getNews, getPost, readingMinutes } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getNews().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | IEEE Student Branch`,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, images: [post.image], publishedTime: post.date },
  };
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const minutes = readingMinutes(post.body);
  const url = `${siteUrl}/news/${post.slug}`;
  const more = getNews().filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: post.date,
    image: post.image,
    description: post.excerpt,
    publisher: { "@type": "Organization", name: "IEEE Student Branch, Saintgits College of Engineering" },
    mainEntityOfPage: url,
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero kicker={`${post.tag} · ${formatDate(post.date)} · ${minutes} min read`} title={post.title} desc={post.excerpt} image={post.image} />

      <article className="article">
        <div className="container article-inner">
          <div className="article-cover shimmer" data-reveal="up">
            <Img src={post.image} alt="" width={1200} height={600} sizes="(max-width: 900px) 100vw, 800px" priority />
          </div>
          <div className="article-body" data-reveal="stagger">
            {post.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <ShareButtons url={url} title={post.title} />
          <Link href="/news" className="btn btn-ghost" style={{ marginTop: 24 }}>
            ← All news
          </Link>
        </div>
      </article>

      {more.length > 0 && (
        <section className="news-section">
          <div className="container">
            <div data-reveal="stagger" style={{ marginBottom: 24 }}>
              <div className="eyebrow">Keep reading</div>
              <h2 className="section-title" style={{ fontSize: "clamp(30px, 3vw, 44px)" }}>
                More stories
              </h2>
            </div>
            <div className="news-grid" data-reveal="stagger">
              {more.map((p) => (
                <NewsCard post={p} key={p.slug} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
