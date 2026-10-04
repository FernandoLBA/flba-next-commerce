import { AppButton, AppLink, ThemeToggle } from "@/shared/components/ui";
import {
  AppDrawer,
  AppDrawerContent,
  AppDrawerFooter,
  AppDrawerTitle,
} from "@/shared/components/ui/app-drawer/app-drawer";
import { appRoutes } from "@/shared/constants/app.routes";
import { ShoppingCart, X } from "lucide-react";
import { Footer } from "../../../footer/footer";
import { navLinks } from "../../lib/constants/nav-links";

export const MenuDrawer = () => {
  return (
    <AppDrawer>
      <AppDrawerContent>
        <div className="relative p-4">
          <AppButton className="absolute right-5 top-4 p-1 rounded-full">
            <X />
          </AppButton>

          <AppDrawerTitle>Menú</AppDrawerTitle>

          <ul className="my-6 px-2">
            {navLinks.map((nl) => (
              <li key={nl.label} className="flex-y-between gap-2 h-10">
                <AppLink className="link-drawer" href={nl.url}>
                  {nl.label}
                </AppLink>
              </li>
            ))}
          </ul>

          <AppDrawerTitle>Categorías</AppDrawerTitle>

          <ul className="mt-6 px-2">
            {navLinks.map((nl) => (
              <li key={nl.label} className="flex-y-between gap-2 h-10">
                <AppLink className="link-drawer" href={nl.url}>
                  {nl.label}
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

            <AppLink href={appRoutes.CART.BASE}>
              <ShoppingCart />
            </AppLink>
          </li>
        </ul>

        <div className="block md:hidden">
          <Footer />
        </div>
      </AppDrawerFooter>
    </AppDrawer>
  );
};
