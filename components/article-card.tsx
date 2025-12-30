import Link from "next/link";
import type { Article } from "../lib/types";
import { formatDate, getImageUrl } from "../lib/utils";

export const ArticleCard = ({ article }: { article: Article }) => (
  <article className="group flex flex-col gap-4 rounded-3xl border border-border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
    <Link href={`/articles/${article.id}`} className="relative overflow-hidden rounded-2xl">
      <img
        src={getImageUrl(article.image)}
        alt={article.title}
        className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
      />
      <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
        {article.category}
      </div>
    </Link>
    <div className="flex items-center justify-between text-xs text-slate-500">
      <span>{formatDate(article.date)}</span>
      <span>{article.readTime}</span>
    </div>
    <Link href={`/articles/${article.id}`}>
      <h3 className="font-display text-2xl text-foreground group-hover:text-accent">
        {article.title}
      </h3>
    </Link>
    <p className="text-sm text-slate-600">{article.dek}</p>
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
      {article.author}
    </p>
  </article>
);
