import Link from "next/link";
import type { Podcast } from "../lib/types";
import { formatDate } from "../lib/utils";

export const PodcastCard = ({ podcast }: { podcast: Podcast }) => (
  <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
    <div className="aspect-video overflow-hidden rounded-xl">
      <iframe
        className="h-full w-full"
        src={podcast.videoUrl}
        title={podcast.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
    <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
      <span>{podcast.host}</span>
      <span>{formatDate(podcast.date)}</span>
    </div>
    <Link href={`/podcasts/${podcast.id}`}>
      <h3 className="mt-2 font-display text-2xl text-foreground hover:text-accent">
        {podcast.title}
      </h3>
    </Link>
    <p className="mt-2 text-sm text-slate-600">{podcast.description}</p>
    <Link
      href={`/podcasts/${podcast.id}`}
      className="mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.2em] text-accent"
    >
      View episode
    </Link>
  </div>
);
