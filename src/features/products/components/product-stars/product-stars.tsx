import { Star } from "lucide-react";

export const ProductStars = ({ value }: { value: number }) => (
  <div className="flex-center gap-1">
    <Star className="size-4 text-yellow-500 fill-yellow-500" />
    <span className="text-xs md:typo-body-sm">{value}</span>
  </div>
);
