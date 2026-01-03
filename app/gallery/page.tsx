"use client";

import { GalleryCard } from "../../components/gallery-card";
import { useCMSData } from "../../lib/use-cms";

export default function GalleryPage() {
  const { data } = useCMSData();

  if (!data) {
    return <div className="mx-auto max-w-6xl px-6 py-24">Зареждане...</div>;
  }

  return (
    <div className="relative mx-auto w-full max-w-6xl px-6 py-16">
      <div className="pointer-events-none absolute -top-10 left-10 h-24 w-24 bg-accent3/70" style={{ clipPath: "polygon(0 10%, 100% 0, 80% 100%, 15% 90%)" }} />
      <div className="pointer-events-none absolute -top-16 right-10 h-28 w-28 bg-accent/80" style={{ clipPath: "polygon(50% 0, 100% 65%, 20% 100%, 0 35%)" }} />
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="section-title">Галерия</p>
          <h1 className="font-display text-5xl text-foreground">
            Редакцията в кадри
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-600">
            Фотоесе, задкулисни истории и подбрани визуални разкази от
            нашата редакция.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-muted p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Визуален обзор
          </p>
          <h2 className="mt-3 font-display text-3xl text-foreground">
            Поглед отвътре към редакцията
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Подбрани кадри от визуалната редакция с най-важните моменти от
            седмицата.
          </p>
        </div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.images.map((image) => (
          <GalleryCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}
