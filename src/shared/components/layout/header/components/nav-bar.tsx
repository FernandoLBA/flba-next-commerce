import { AppLink } from "@/shared/components/ui";
import { appRoutes } from "@/shared/constants/app.routes";
import { appSettings } from "@/shared/constants/app.settings";
import { Code, EllipsisVertical, ShoppingCart, User } from "lucide-react";
import { navLinks } from "../lib/constants/nav-links";

export const NavBar = () => {
  return (
    <nav className="w-full border-b fixed bg-black text-primary z-10">
      <div className="flex justify-between h-12 items-center px-6">
        {/* Marca */}
        <AppLink href={appRoutes.HOME.BASE}>
          <div className="flex items-center gap-1">
            <Code />

            <span className="hidden md:block text-sm">{appSettings.APP_NAME}</span>
          </div>
        </AppLink>

        {/* Icono menu mobile */}
        <div className="block md:hidden cursor-pointer">
          <EllipsisVertical />
        </div>

        {/* Menu desktop */}
        <div className="hidden md:flex justify-between gap-3">
          {navLinks.map((nl) => (
            <AppLink key={nl.label} href={nl.url}>
              {nl.label}
            </AppLink>
          ))}
        </div>

        <div className="hidden md:block">
          <div className="flex gap-4">
            <AppLink href={appRoutes.CART.BASE}>
              <ShoppingCart />
            </AppLink>

            <AppLink
              className="bg-primary rounded-full p-1 text-white"
              href={appRoutes.CART.BASE}
            >
              <User color="#fff" size={20} />
            </AppLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
