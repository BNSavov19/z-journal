import type { GalleryImage } from "../lib/types";
import { getImageUrl } from "../lib/utils";

export const GalleryCard = ({ image }: { image: GalleryImage }) => (
  <div className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
    <img
      src={getImageUrl(image.url)}
      alt={image.title}
      className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
    />
    <div className="p-4">
      <p className="text-sm font-semibold text-foreground">{image.title}</p>
    </div>
  </div>
);
