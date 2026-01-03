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
            <p className="section-title">Статии</p>
            <h1 className="font-display text-5xl text-foreground">
              Най-новите материали
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600">
              Дълбоки анализи, бележки по темата и разследващи материали за
              модерния читател.
            </p>
          </div>
          <div className="w-full max-w-md">
            <Input
              placeholder="Търси по тема, автор или ключова дума"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
      </div>

      {data && (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {filtered.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {data && filtered.length === 0 && (
        <div className="mt-12 rounded-2xl border border-border bg-muted p-8 text-center">
          <p className="text-sm text-slate-600">
            Няма статии, които съвпадат с търсенето. Опитайте друга дума.
          </p>
        </div>
      )}
    </div>
  );
}
