"use client";

import { cn } from "@/shared/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  page: number;
  totalPages: number;
};

export const Pagination = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePagination = (targetPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(targetPage));
    const newURL = `${pathname}?${params.toString()}`;

    router.push(newURL);
  };

  console.log(typeof page, typeof totalPages);

  return (
    <div className="flex gap-2 mt-4 items-center">
      <button
        className={cn(
          "cursor-pointer hover:font-bold",
          page == 1 && "text-gray-600",
        )}
        disabled={page == 1}
        onClick={() => handlePagination(page - 1)}
      >
        <ChevronLeft />
      </button>

      {Array.from({ length: +totalPages }).map((x, index) => (
        <button
          className={cn(
            "cursor-pointer hover:font-bold",
            index + 1 == page && "text-primary font-bold",
          )}
          key={index}
          onClick={() => handlePagination(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        className={cn(
          "cursor-pointer hover:font-bold",
          totalPages <= +page && "text-gray-600",
        )}
        disabled={totalPages <= page}
        onClick={() => handlePagination(+page + 1)}
      >
        <ChevronRight />
      </button>
    </div>
  );
};
