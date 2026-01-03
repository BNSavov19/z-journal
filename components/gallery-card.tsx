import type { GalleryImage } from "../lib/types";
import { getImageUrl } from "../lib/utils";

export const GalleryCard = ({ image }: { image: GalleryImage }) => (
  <div className="group overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
    <div className="relative">
      <img
        src={getImageUrl(image.url)}
        alt={image.title}
        className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#403995] via-transparent to-transparent opacity-70" />
    </div>
    <div className="flex items-center justify-between p-4">
      <p className="text-sm font-semibold text-foreground">{image.title}</p>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
        Галерия
      </span>
    </div>
  </div>
);
