"use client";

import { AppButton, AppLink, StatusMessage } from "@/shared/components/ui";
import { appMessages } from "@/shared/constants/app.messages";
import { appRoutes } from "@/shared/constants/app.routes";
import { selectCount, selectSubtotal } from "@/shared/stores/cart.selectors";
import { useCartStore } from "@/shared/stores/cart.store";
import { useCartHydrated } from "@/shared/stores/use-cart-count";
import { formatPrice } from "@/shared/utils/format-price";
import { ShoppingCart } from "lucide-react";
import { CartItemRow } from "../components/cart-item-row/cart-item-row";

export const CartView = () => {
  const text = appMessages.CART;
  const hydrated = useCartHydrated();
  const items = useCartStore((state) => state.items);
  const count = useCartStore(selectCount);
  const subtotal = useCartStore(selectSubtotal);
  const clear = useCartStore((state) => state.clear);

  if (!hydrated) return null;

  if (items.length === 0) {
    return (
      <StatusMessage
        icon={<ShoppingCart aria-hidden className="size-16 text-muted" />}
        title={text.EMPTY_TITLE}
        description={text.EMPTY_DESCRIPTION}
        actions={
          <AppLink variant="button" href={appRoutes.PRODUCTS.BASE}>
            {text.EMPTY_ACTION}
          </AppLink>
        }
      />
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl">
      <h1 className="typo-title mb-6">{text.TITLE}</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </ul>

        <aside className="flex h-fit flex-col gap-4 rounded-md border border-border p-4">
          <h2 className="typo-heading">{text.SUMMARY}</h2>

          <dl className="flex-x-between">
            <dt className="typo-body-sm text-muted">
              {count} {count === 1 ? "artículo" : "artículos"}
            </dt>
            <dd className="typo-price">{formatPrice(subtotal)}</dd>
          </dl>

          <AppButton className="w-full" disabled>
            {text.CHECKOUT}
          </AppButton>

          <AppButton variant="outline" className="w-full" onClick={clear}>
            {text.CLEAR}
          </AppButton>
        </aside>
      </div>
    </section>
  );
};
