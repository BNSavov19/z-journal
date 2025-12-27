"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCMSData } from "../../../lib/use-cms";
import { formatDate } from "../../../lib/utils";

export default function PodcastDetailPage() {
  const params = useParams<{ id: string }>();
  const { data } = useCMSData();

  if (!data) {
    return <div className="mx-auto max-w-6xl px-6 py-24">Loading...</div>;
  }

  const podcast = data.podcasts.find((item) => item.id === params.id);

  if (!podcast) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24">
        <p className="section-title">Podcast</p>
        <h1 className="font-display text-4xl text-foreground">
          Podcast not found
        </h1>
        <Link
          href="/podcasts"
          className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-accent"
        >
          Back to podcasts
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <section className="border-b border-border">
        <div className="mx-auto w-full max-w-4xl px-6 py-12">
          <Link
            href="/podcasts"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
          >
            Back to podcasts
          </Link>
          <h1 className="mt-6 font-display text-5xl text-foreground">
            {podcast.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
            <span>{podcast.host}</span>
            <span>{formatDate(podcast.date)}</span>
          </div>
          <p className="mt-4 text-base text-slate-600">
            {podcast.description}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl px-6 py-12">
        <div className="aspect-video overflow-hidden rounded-3xl border border-border bg-white">
          <iframe
            className="h-full w-full"
            src={podcast.videoUrl}
            title={podcast.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  );
}
