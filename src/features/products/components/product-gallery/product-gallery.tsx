"use client";

import { AppButton } from "@/shared/components/ui";
import { cn } from "@/shared/utils/cn";
import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  title: string;
};

export const ProductGallery = ({ images, title }: ProductGalleryProps) => {
  const [selected, setSelected] = useState(0);
  const current = images[selected] ?? images[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-secondary">
        <Image
          className="object-contain"
          src={current}
          alt={title}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>

      {images.length > 1 && (
        <ul className="grid grid-cols-5 gap-2">
          {images.map((src, index) => (
            <li key={src}>
              <AppButton
                type="button"
                aria-label={`${title}: imagen ${index + 1}`}
                aria-current={index === selected}
                onClick={() => setSelected(index)}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-md border bg-secondary",
                  index === selected ? "border-primary" : "border-border",
                )}
              >
                <Image
                  className="object-contain"
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 10vw, 20vw"
                />
              </AppButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
