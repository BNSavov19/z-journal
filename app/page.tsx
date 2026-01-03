"use client";

import Link from "next/link";
import { ArticleCard } from "../components/article-card";
import { useCMSData } from "../lib/use-cms";
import { formatDate, getImageUrl } from "../lib/utils";
import { Badge } from "../components/ui/badge";

export default function HomePage() {
  const { data } = useCMSData();

  if (!data) {
    return <div className="mx-auto max-w-6xl px-6 py-24">Зареждане...</div>;
  }

  const [featured, ...rest] = data.articles;

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-border bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,190,84,0.45),transparent_58%),radial-gradient(circle_at_bottom_right,rgba(64,57,149,0.25),transparent_60%)]" />
        <div
          className="pointer-events-none absolute -left-12 top-16 h-56 w-56 bg-accent4/80"
          style={{ clipPath: "polygon(0 15%, 85% 0, 100% 65%, 35% 100%)" }}
        />
        <div
          className="pointer-events-none absolute right-16 top-10 h-44 w-44 rotate-12 bg-accent3/80"
          style={{ clipPath: "polygon(50% 0, 100% 35%, 80% 100%, 0 65%)" }}
        />
        <div
          className="pointer-events-none absolute bottom-8 right-1/3 h-32 w-32 bg-accent5/80"
          style={{ clipPath: "polygon(0 0, 100% 15%, 75% 100%, 10% 85%)" }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-40 h-28 w-36 rotate-12 bg-[repeating-linear-gradient(135deg,rgba(255,190,84,0.9),rgba(255,190,84,0.9)_6px,rgba(64,57,149,0.1)_6px,rgba(64,57,149,0.1)_12px)]"
          style={{ clipPath: "polygon(0 0, 100% 10%, 80% 100%, 15% 85%)" }}
        />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-between gap-10">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <span className="rounded-full border border-border bg-white px-3 py-1">
                  Общество
                </span>
                <span className="rounded-full border border-border bg-white px-3 py-1">
                  Култура
                </span>
                <span className="rounded-full border border-border bg-white px-3 py-1">
                  Медии
                </span>
              </div>
              <h1 className="font-display text-5xl leading-tight text-foreground md:text-6xl">
                Историите зад новините - разказани по нашия начин
              </h1>
              <p className="max-w-xl text-base text-slate-600">
                Z Journal e студентска медия, създадена от пет момичета, които учат журналистика в НБУ. Пишем за света около нас така, както го вижа нашето поколение - с позиция, критично мислене и характер.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/articles"
                  className="rounded-full bg-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                >
                  Прочети най-новото
                </Link>
                <Link
                  href="/podcasts"
                  className="rounded-full border border-accent px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
                >
                  Слушай подкасти
                </Link>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "члена в екипа", value: "5" },
                { label: "студентски поглед", value: "100%" },
                { label: "идеи и истории", value: "∞" }
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border bg-white/80 p-4 text-center shadow-sm"
                >
                  <p className="text-lg font-semibold text-foreground">
                    {item.value}
                  </p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {featured && (
            <div className="flex flex-col gap-6">
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

      <section className="relative mx-auto w-full max-w-6xl px-6 py-16">
        <div className="pointer-events-none absolute -top-12 right-6 h-24 w-28 bg-accent2/80" style={{ clipPath: "polygon(50% 0, 100% 60%, 20% 100%, 0 35%)" }} />
        <div className="pointer-events-none absolute -top-2 right-28 h-16 w-16 bg-accent/90" style={{ clipPath: "polygon(0 0, 100% 20%, 75% 100%, 10% 80%)" }} />
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-title">Последни статии</p>
            <h2 className="font-display text-4xl text-foreground">
              Акценти от редакцията
            </h2>
          </div>
          <Link
            href="/articles"
            className="hidden rounded-full border border-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-white md:inline-flex"
          >
            Виж всички
          </Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {rest.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border bg-muted">
        <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rotate-6 bg-accent/15" style={{ clipPath: "polygon(10% 0, 100% 20%, 70% 100%, 0 85%)" }} />
        <div className="pointer-events-none absolute -left-20 bottom-8 h-48 w-48 bg-accent5/20" style={{ clipPath: "polygon(0 15%, 70% 0, 100% 80%, 15% 100%)" }} />
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
              <p className="section-title">От редакторите</p>
              <h2 className="mt-4 font-display text-4xl text-foreground">
                Подбран поглед към света.
              </h2>
              <p className="mt-4 text-sm text-slate-600">
                Следим движенията на пазара, капиталовите потоци и политическите
                промени с аналитичната точност, която се очаква от модерна медия.
              </p>
              <div className="mt-6 grid gap-4">
                {data.articles.slice(0, 2).map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.id}`}
                    className="flex items-center justify-between rounded-2xl border border-border bg-muted px-4 py-3 text-sm font-semibold text-foreground"
                  >
                    <span>{article.title}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      {article.category}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {data.articles.slice(0, 4).map((article, index) => (
                <div
                  key={article.id}
                  className="rounded-3xl border border-border bg-white p-6 shadow-sm"
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                      index % 2 === 0 ? "text-accent" : "text-accent4"
                    }`}
                  >
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
        </div>
      </section>
    </div>
  );
}
