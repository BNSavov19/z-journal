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
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="section-title">Articles</p>
          <h1 className="font-display text-5xl text-foreground">
            The latest reporting
          </h1>
        </div>
        <div className="w-full max-w-md">
          <Input
            placeholder="Search by topic, author, or keyword"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

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
