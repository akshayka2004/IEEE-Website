import Link from "next/link";
import Img from "./Img";
import { readingMinutes, type NewsPost } from "@/lib/content";
import { formatDate } from "@/lib/format";

export default function NewsCard({ post }: { post: NewsPost }) {
  return (
    <article className="news-card spot">
      <Link href={`/news/${post.slug}`} className="news-photo shimmer" tabIndex={-1} aria-hidden="true">
        <Img src={post.image} alt="" width={800} height={450} sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" />
      </Link>
      <div className="news-info">
        <div className="news-meta">
          <span className="event-tag">{post.tag}</span>
          <span>
            {formatDate(post.date)} · {readingMinutes(post.body)} min read
          </span>
        </div>
        <h3>
          <Link href={`/news/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.excerpt}</p>
        <Link href={`/news/${post.slug}`} className="event-link">
          Read more →
        </Link>
      </div>
    </article>
  );
}
