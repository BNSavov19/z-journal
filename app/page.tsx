"use client";

import Link from "next/link";
import { ArticleCard } from "../components/article-card";
import { useCMSData } from "../lib/use-cms";
import { formatDate, getImageUrl } from "../lib/utils";
import { Badge } from "../components/ui/badge";

export default function HomePage() {
  const { data } = useCMSData();

  if (!data) {
    return <div className="mx-auto max-w-6xl px-6 py-24">Loading...</div>;
  }

  const [featured, ...rest] = data.articles;

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,179,124,0.35),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(43,27,125,0.2),transparent_55%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 lg:flex-row">
          <div className="flex-1 space-y-6">
            <p className="section-title">Today in focus</p>
            <h1 className="font-display text-5xl leading-tight text-foreground md:text-6xl">
              Global business, markets, and tech in one modern newsroom.
            </h1>
            <p className="max-w-xl text-base text-slate-600">
              Z Journal delivers sharp reporting, long-form analysis, and an
              evolving multimedia desk built for the next generation of
              decision-makers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/articles"
                className="rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              >
                Read the latest
              </Link>
              <Link
                href="/podcasts"
                className="rounded-full border border-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
              >
                Listen to podcasts
              </Link>
            </div>
            <div className="flex items-center gap-6 text-xs text-slate-500">
              <div>
                <p className="text-lg font-semibold text-foreground">120k+</p>
                Daily subscribers
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">36</p>
                Global bureaus
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">18</p>
                Editorial desks
              </div>
            </div>
          </div>
          {featured && (
            <div className="flex-1">
              <div className="rounded-[32px] border border-border bg-white p-6 shadow-soft">
                <Link href={`/articles/${featured.id}`}>
                  <img
                    src={getImageUrl(featured.image)}
                    alt={featured.title}
                    className="h-72 w-full rounded-2xl object-cover"
                  />
                </Link>
                <div className="mt-6 flex items-center gap-3">
                  <Badge>{featured.category}</Badge>
                  <span className="text-xs text-slate-500">
                    {formatDate(featured.date)} · {featured.readTime}
                  </span>
                </div>
                <Link href={`/articles/${featured.id}`}>
                  <h2 className="mt-3 font-display text-3xl text-foreground">
                    {featured.title}
                  </h2>
                </Link>
                <p className="mt-2 text-sm text-slate-600">{featured.dek}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  {featured.author}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-title">Latest articles</p>
            <h2 className="font-display text-4xl text-foreground">
              Newsroom highlights
            </h2>
          </div>
          <Link
            href="/articles"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            View all
          </Link>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {rest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="section-title">From the editors</p>
              <h2 className="font-display text-4xl text-foreground">
                A curated global view.
              </h2>
            </div>
            <p className="max-w-xl text-sm text-slate-600">
              Our reporters track market movers, capital flows, and deep
              political shifts with the analytical rigor expected from a modern
              business daily.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {data.articles.slice(0, 3).map((article) => (
              <div
                key={article.id}
                className="rounded-2xl border border-border bg-white p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {article.category}
                </p>
                <h3 className="mt-3 font-display text-2xl text-foreground">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{article.dek}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
