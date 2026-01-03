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
    return <div className="mx-auto max-w-6xl px-6 py-24">Зареждане...</div>;
  }

  const article = data.articles.find((item) => item.id === params.id);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24">
        <p className="section-title">Статия</p>
        <h1 className="font-display text-4xl text-foreground">
          Статията не е намерена
        </h1>
        <Link
          href="/articles"
          className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-accent"
        >
          Обратно към статиите
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-border bg-muted">
        <div className="pointer-events-none absolute -left-12 top-8 h-32 w-32 bg-accent4/30" style={{ clipPath: "polygon(0 0, 100% 20%, 80% 100%, 10% 85%)" }} />
        <div className="pointer-events-none absolute right-10 top-10 h-24 w-28 bg-accent2/80" style={{ clipPath: "polygon(50% 0, 100% 55%, 70% 100%, 0 75%)" }} />
        <div className="mx-auto w-full max-w-4xl px-6 py-12">
          <Link
            href="/articles"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            Обратно към статиите
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
        <div className="rounded-[32px] border border-border bg-white p-4 shadow-sm">
          <img
            src={getImageUrl(article.image)}
            alt={article.title}
            className="h-80 w-full rounded-2xl object-cover"
          />
        </div>
        <div
          className="prose mt-8 max-w-none text-sm text-slate-700"
          dangerouslySetInnerHTML={{ __html: article.content || "" }}
        />
      </section>
    </div>
  );
}
