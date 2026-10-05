"use client";

import { AppButton } from "@/shared/components/ui";
import { appMessages } from "@/shared/constants/app.messages";
import { cn } from "@/shared/utils/cn";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { ProductFilters } from "../../types/product.types";
import {
  buildProductsHref,
  parseSortOption,
  PRODUCT_SORT_OPTIONS,
  sortOptionValue,
} from "../../utils/product-filters";

const text = appMessages.PRODUCTS;
const fieldClass =
  "h-10 rounded-md border border-border bg-background px-3 typo-body-sm text-foreground placeholder:text-muted";

type ProductToolbarProps = {
  filters: ProductFilters;
};

export const ProductToolbar = ({ filters }: ProductToolbarProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(filters.q ?? "");

  const navigate = (changes: Partial<ProductFilters>) =>
    startTransition(() =>
      router.push(buildProductsHref({ ...filters, ...changes, page: 1 })),
    );

  return (
    <div
      aria-busy={isPending}
      className={cn(
        "flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between",
        isPending && "opacity-60",
      )}
    >
      <form
        role="search"
        className="flex w-full gap-2 md:max-w-md"
        onSubmit={(event) => {
          event.preventDefault();
          navigate({ q: query.trim() || undefined });
        }}
      >
        <label htmlFor="products-search" className="sr-only">
          {text.SEARCH_LABEL}
        </label>
        <input
          id="products-search"
          type="search"
          value={query}
          maxLength={80}
          placeholder={text.SEARCH_PLACEHOLDER}
          onChange={(event) => setQuery(event.target.value)}
          className={cn(fieldClass, "min-w-0 flex-1")}
        />

        <AppButton type="submit" className="px-4">
          {text.SEARCH_BUTTON}
        </AppButton>

        {filters.q && (
          <AppButton
            variant="outline"
            className="px-4"
            onClick={() => {
              setQuery("");
              navigate({ q: undefined });
            }}
          >
            {text.CLEAR_SEARCH}
          </AppButton>
        )}
      </form>

      <div className="flex items-center gap-2">
        <label htmlFor="products-sort" className="typo-body-sm text-muted">
          {text.SORT_LABEL}
        </label>
        <select
          id="products-sort"
          value={sortOptionValue(filters)}
          onChange={(event) => navigate(parseSortOption(event.target.value))}
          className={cn(fieldClass, "cursor-pointer")}
        >
          {PRODUCT_SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
