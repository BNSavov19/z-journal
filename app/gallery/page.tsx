"use client";

import { GalleryCard } from "../../components/gallery-card";
import { useCMSData } from "../../lib/use-cms";

export default function GalleryPage() {
  const { data } = useCMSData();

  if (!data) {
    return <div className="mx-auto max-w-6xl px-6 py-24">Loading...</div>;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <div>
        <p className="section-title">Gallery</p>
        <h1 className="font-display text-5xl text-foreground">
          The newsroom in images
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-600">
          Photo essays, behind-the-scenes coverage, and curated visual stories
          from across our bureaus.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.images.map((image) => (
          <GalleryCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}
