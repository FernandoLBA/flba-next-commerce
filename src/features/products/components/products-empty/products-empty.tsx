import { AppLink } from "@/shared/components/ui";
import { appMessages } from "@/shared/constants/app.messages";
import { SearchX } from "lucide-react";
import type { ProductFilters } from "../../types/product.types";
import { buildProductsHref } from "../../utils/product-filters";

const text = appMessages.PRODUCTS;

export const ProductsEmpty = ({ filters }: { filters: ProductFilters }) => (
  <div
    role="status"
    className="flex w-full flex-col items-center gap-3 py-16 text-center"
  >
    <SearchX aria-hidden className="size-12 text-muted" />

    <p className="typo-heading">{text.EMPTY_TITLE}</p>

    <p className="typo-body-sm max-w-md text-muted">
      {filters.q
        ? `${text.EMPTY_FOR_QUERY} «${filters.q}». ${text.EMPTY_DESCRIPTION}`
        : text.EMPTY_DESCRIPTION}
    </p>

    {filters.q && (
      <AppLink
        variant="outline"
        href={buildProductsHref({ ...filters, q: undefined, page: 1 })}
      >
        {text.EMPTY_ACTION}
      </AppLink>
    )}
  </div>
);
