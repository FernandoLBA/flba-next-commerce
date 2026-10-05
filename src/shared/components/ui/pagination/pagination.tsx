"use client";

import { cn } from "@/shared/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./pagination.module.css";

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
    <div className={styles.root}>
      {parsedPage !== 1 && (
        <Link href={buildHref(parsedPage - 1)} className={styles.arrow}>
          <ChevronLeft />
        </Link>
      )}

      <div className={styles.pages}>
        {Array.from({ length: +totalPages }).map((x, index) => {
          const selectedPage = index + 1;

          return (
            <Link
              href={buildHref(selectedPage)}
              className={cn(
                styles.page,
                selectedPage === parsedPage && styles.pageActive,
              )}
              key={index}
            >
              {selectedPage}
            </Link>
          );
        })}
      </div>

      <div className={styles.mobilePage}>{parsedPage}</div>

      {parsedPage < totalPages && (
        <Link href={buildHref(parsedPage + 1)} className={styles.arrow}>
          <ChevronRight />
        </Link>
      )}
    </div>
  );
};
