import Link from "next/link";
import type { Article } from "../lib/types";
import { formatDate, getImageUrl } from "../lib/utils";
import { Badge } from "./ui/badge";

export const ArticleCard = ({ article }: { article: Article }) => (
  <article className="group flex flex-col gap-4">
    <Link href={`/articles/${article.id}`} className="overflow-hidden rounded-2xl">
      <img
        src={getImageUrl(article.image)}
        alt={article.title}
        className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
      />
    </Link>
    <div className="flex items-center gap-3">
      <Badge>{article.category}</Badge>
      <span className="text-xs text-slate-500">
        {formatDate(article.date)} · {article.readTime}
      </span>
    </div>
    <Link href={`/articles/${article.id}`}>
      <h3 className="font-display text-2xl text-foreground group-hover:text-accent">
        {article.title}
      </h3>
    </Link>
    <p className="text-sm text-slate-600">{article.dek}</p>
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
      {article.author}
    </p>
  </article>
);
