"use client";

import { PodcastCard } from "../../components/podcast-card";
import { useCMSData } from "../../lib/use-cms";

export default function PodcastsPage() {
  const { data } = useCMSData();

  if (!data) {
    return <div className="mx-auto max-w-6xl px-6 py-24">Зареждане...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <div className="relative overflow-hidden rounded-[32px] border border-border bg-white p-8 shadow-sm">
        <div className="pointer-events-none absolute -left-10 top-6 h-24 w-24 bg-accent4/70" style={{ clipPath: "polygon(0 15%, 85% 0, 100% 70%, 20% 100%)" }} />
        <div className="pointer-events-none absolute right-12 bottom-8 h-24 w-28 bg-accent5/80" style={{ clipPath: "polygon(50% 0, 100% 55%, 70% 100%, 0 75%)" }} />
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-title">Подкасти</p>
            <h1 className="font-display text-5xl text-foreground">
              Аудио обзори и дълги интервюта
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-slate-600">
              Всеки епизод съчетава кратък видео обзор с гледни точки от
              репортери и анализатори по темите, които движат света.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-muted px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Нов епизод всяка седмица
          </div>
        </div>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {data.podcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
}
