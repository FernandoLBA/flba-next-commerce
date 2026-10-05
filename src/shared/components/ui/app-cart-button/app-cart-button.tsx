"use client";

import { appRoutes } from "@/shared/constants/app.routes";
import { useCartCount } from "@/shared/stores/cart/use-cart-count";
import { cn } from "@/shared/utils/cn";
import { ShoppingCart } from "lucide-react";
import { ComponentProps } from "react";
import { AppLink } from "../app-link/app-link";

export const AppCartButton = ({
  onClick,
  className,
  ...props
}: ComponentProps<"a">) => {
  const count = useCartCount();

  return (
    <AppLink
      href={appRoutes.CART.BASE}
      aria-label={`Carrito, ${count} ${count === 1 ? "artículo" : "artículos"}`}
      className={cn("relative", className)}
      onClick={onClick}
      {...props}
    >
      <ShoppingCart />

      {count > 0 && (
        <span
          aria-hidden
          className="flex-center absolute -right-2 -top-2 h-5 min-w-5 rounded-full bg-destructive px-1 typo-caption font-bold text-destructive-foreground"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </AppLink>
  );
};
