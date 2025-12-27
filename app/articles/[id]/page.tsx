"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "../../../components/ui/badge";
import { useCMSData } from "../../../lib/use-cms";
import { formatDate, getImageUrl } from "../../../lib/utils";

export default function ArticleDetailPage() {
  const params = useParams<{ id: string }>();
  const { data } = useCMSData();

  if (!data) {
    return <div className="mx-auto max-w-6xl px-6 py-24">Loading...</div>;
  }

  const article = data.articles.find((item) => item.id === params.id);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24">
        <p className="section-title">Article</p>
        <h1 className="font-display text-4xl text-foreground">
          Article not found
        </h1>
        <Link
          href="/articles"
          className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-accent"
        >
          Back to articles
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-6 py-12">
          <Link
            href="/articles"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            Back to articles
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <Badge>{article.category}</Badge>
            <span className="text-xs text-slate-500">
              {formatDate(article.date)} · {article.readTime}
            </span>
          </div>
          <h1 className="mt-4 font-display text-5xl text-foreground">
            {article.title}
          </h1>
          <p className="mt-4 text-base text-slate-600">{article.dek}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {article.author}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-6 py-12">
        <img
          src={getImageUrl(article.image)}
          alt={article.title}
          className="h-80 w-full rounded-3xl object-cover"
        />
        <div className="prose mt-8 max-w-none text-sm text-slate-700">
          <p>{article.content}</p>
        </div>
      </section>
    </div>
  );
}
