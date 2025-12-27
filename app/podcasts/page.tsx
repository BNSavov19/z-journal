"use client";

import { PodcastCard } from "../../components/podcast-card";
import { useCMSData } from "../../lib/use-cms";

export default function PodcastsPage() {
  const { data } = useCMSData();

  if (!data) {
    return <div className="mx-auto max-w-6xl px-6 py-24">Loading...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <div>
        <p className="section-title">Podcasts</p>
        <h1 className="font-display text-5xl text-foreground">
          Audio briefs and long-form interviews
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-600">
          Every episode pairs a concise video briefing with insights from
          reporters and analysts across markets, policy, and innovation.
        </p>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {data.podcasts.map((podcast) => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
}
