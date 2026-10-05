"use client"

import {
  AppButton,
  AppCartButton,
  AppLink,
  ThemeToggle,
} from "@/shared/components/ui";
import {
  AppDrawer,
  AppDrawerContent,
  AppDrawerFooter,
  AppDrawerTitle,
} from "@/shared/components/ui/app-drawer/app-drawer";
import { appMessages } from "@/shared/constants/app.messages";
import { appRoutes } from "@/shared/constants/app.routes";
import { useCategories } from "@/shared/providers/categories-provider";
import { X } from "lucide-react";
import { Footer } from "../../../footer/footer";
import { navLinks } from "../../lib/constants/nav-links";

type MenuDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export const MenuDrawer = ({ open, onClose }: MenuDrawerProps) => {
  const categories = useCategories();
  const text = appMessages.MENU;

  return (
    <AppDrawer open={open} onClose={onClose}>
      <AppDrawerContent>
        <div className="relative p-4">
          <AppButton
            aria-label={text.CLOSE}
            className="absolute right-5 top-4 p-1 rounded-full"
            onClick={onClose}
          >
            <X />
          </AppButton>

          <AppDrawerTitle>{text.TITLE}</AppDrawerTitle>

          <ul className="my-6 px-2">
            {navLinks.map((nl) => (
              <li key={nl.label} className="flex-y-between gap-2 h-10">
                <AppLink
                  className="link-drawer"
                  href={nl.url}
                  onClick={onClose}
                >
                  {nl.label}
                </AppLink>
              </li>
            ))}
          </ul>

          <AppDrawerTitle>{text.CATEGORIES}</AppDrawerTitle>

          <ul className="mt-6 px-2">
            {categories.map((category) => (
              <li key={category.slug} className="flex-y-between gap-2 h-10">
                <AppLink
                  className="link-drawer"
                  href={appRoutes.PRODUCTS.byCategory(category.slug)}
                  onClick={onClose}
                >
                  {category.name}
                </AppLink>
              </li>
            ))}
          </ul>
        </div>
      </AppDrawerContent>

      <AppDrawerFooter className="flex-y-between gap-1">
        <ul className="flex-x-end">
          <li className="flex-x-between gap-8 mb-1 bg-surface px-10 py-4 rounded-l-full">
            <ThemeToggle />

            <AppCartButton onClick={onClose} />
          </li>
        </ul>

        <div className="block md:hidden">
          <Footer />
        </div>
      </AppDrawerFooter>
    </AppDrawer>
  );
};
