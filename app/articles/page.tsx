"use client";

import { useMemo, useState } from "react";
import { ArticleCard } from "../../components/article-card";
import { Input } from "../../components/ui/input";
import { useCMSData } from "../../lib/use-cms";

export default function ArticlesPage() {
  const { data } = useCMSData();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!data) {
      return [];
    }
    const term = query.trim().toLowerCase();
    if (!term) {
      return data.articles;
    }
    return data.articles.filter((article) => {
      return (
        article.title.toLowerCase().includes(term) ||
        article.dek.toLowerCase().includes(term) ||
        article.author.toLowerCase().includes(term) ||
        article.category.toLowerCase().includes(term)
      );
    });
  }, [data, query]);

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="relative overflow-hidden rounded-[32px] border border-border bg-white p-8 shadow-sm">
        <div className="pointer-events-none absolute -right-10 top-6 h-24 w-24 bg-accent2/80" style={{ clipPath: "polygon(50% 0, 100% 65%, 20% 100%, 0 35%)" }} />
        <div className="pointer-events-none absolute right-16 bottom-6 h-20 w-24 bg-accent3/80" style={{ clipPath: "polygon(0 0, 100% 20%, 80% 100%, 10% 85%)" }} />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-title">Articles</p>
            <h1 className="font-display text-5xl text-foreground">
              The latest reporting
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Deep dives, market notes, and investigative reports curated for a
              modern decision-maker.
            </p>
          </div>
          <div className="w-full max-w-md">
            <Input
              placeholder="Search by topic, author, or keyword"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
      </div>

      {data && (
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          <div className="rounded-3xl border border-border bg-muted p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Editors' desk
            </p>
            <h2 className="mt-3 font-display text-3xl text-foreground">
              The briefing list
            </h2>
            <div className="mt-6 space-y-4">
              {data.articles.slice(0, 4).map((article) => (
                <div
                  key={article.id}
                  className="rounded-2xl border border-border bg-white p-4 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent4">
                    {article.category}
                  </p>
                  <p className="mt-2 font-display text-xl text-foreground">
                    {article.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {data && filtered.length === 0 && (
        <div className="mt-12 rounded-2xl border border-border bg-muted p-8 text-center">
          <p className="text-sm text-slate-600">
            No articles match that search yet. Try a different keyword.
          </p>
        </div>
      )}
    </div>
  );
}
