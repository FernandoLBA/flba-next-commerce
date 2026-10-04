"use client";

import { cn } from "@/shared/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { AppLink } from "../app-link/app-link";

type PaginationProps = {
  page: number;
  totalPages: number;
};

export const Pagination = ({ page, totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const parsedPage = Number(page);

  const buildHref = (targetPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(targetPage));
    const newURL = `${pathname}?${params.toString()}`;

    return newURL;
  };

  return (
    <div className="flex gap-2 my-4 items-center">
      {parsedPage !== 1 && (
        <AppLink
          href={buildHref(parsedPage - 1)}
          className={cn("hover:font-bold")}
        >
          <ChevronLeft />
        </AppLink>
      )}

      {Array.from({ length: +totalPages }).map((x, index) => {
        const selectedPage = index + 1;

        return (
          <AppLink
            href={buildHref(selectedPage)}
            className={cn(
              `hover:font-bold",
              ${selectedPage == parsedPage && "text-primary font-bold"}`,
            )}
            key={index}
          >
            {selectedPage}
          </AppLink>
        );
      })}

      {parsedPage < totalPages && (
        <AppLink
          href={buildHref(parsedPage + 1)}
          className={cn("hover:font-bold")}
        >
          <ChevronRight />
        </AppLink>
      )}
    </div>
  );
};
