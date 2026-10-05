"use client";

import { AppLink } from "@/shared/components/ui";
import { appMessages } from "@/shared/constants/app.messages";
import { useCategories } from "@/shared/providers/categories-provider";
import { cn } from "@/shared/utils/cn";
import type { ProductFilters } from "../../types/product.types";
import { buildProductsHref } from "../../utils/product-filters";

type CategorySidebarProps = {
  activeCategory?: string;
  filters?: ProductFilters;
};

export const CategorySidebar = ({
  activeCategory,
  filters,
}: CategorySidebarProps) => {
  const categories = useCategories();
  const keep = { q: filters?.q, sortBy: filters?.sortBy, order: filters?.order };

  if (categories.length === 0) return null;

  return (
    <aside
      aria-label={appMessages.MENU.CATEGORIES}
      className="hidden lg:block h-full"
    >
      <h2 className="typo-heading mb-5">Categorías</h2>

      <ul className="flex-y-between gap-1">
        <li>
          <AppLink
            href={buildProductsHref(keep)}
            aria-current={!activeCategory ? "page" : undefined}
            className={cn(!activeCategory && "font-bold underline")}
          >
            Todos
          </AppLink>
        </li>

        {categories.map((category) => (
          <li key={category.slug}>
            <AppLink
              href={buildProductsHref({ ...keep, category: category.slug })}
              aria-current={
                category.slug === activeCategory ? "page" : undefined
              }
              className={cn(
                category.slug === activeCategory && "font-bold underline",
              )}
            >
              {category.name}
            </AppLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};
