import Link from "next/link";
import type { Podcast } from "../lib/types";
import { formatDate } from "../lib/utils";

export const PodcastCard = ({ podcast }: { podcast: Podcast }) => (
  <div className="rounded-3xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-accent">
      <span>Подкаст</span>
      <span className="text-slate-500">{formatDate(podcast.date)}</span>
    </div>
    <Link href={`/podcasts/${podcast.id}`}>
      <h3 className="mt-3 font-display text-2xl text-foreground hover:text-accent">
        {podcast.title}
      </h3>
    </Link>
    <p className="mt-2 text-sm text-slate-600">{podcast.description}</p>
    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
      <span>{podcast.host}</span>
      <Link
        href={`/podcasts/${podcast.id}`}
        className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
      >
        Виж епизода
      </Link>
    </div>
    <div className="mt-4 overflow-hidden rounded-2xl border border-border">
      <div className="aspect-video bg-slate-100">
        <iframe
          className="h-full w-full"
          src={podcast.videoUrl}
          title={podcast.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  </div>
);
