import { AppLink } from "@/shared/components/ui";
import { appRoutes, appSettings } from "@/shared/lib";
import { Code, EllipsisVertical, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { navLinks } from "../lib/constants/nav-links";

export const NavBar = () => {
  return (
    <nav className="w-full border-b fixed">
      <div className="flex justify-between h-12 items-center px-6">
        {/* Marca */}
        <Link href={appRoutes.HOME.BASE}>
          <div className="flex gap-1">
            <Code />

            <span className="hidden md:block">{appSettings.APP_NAME}</span>
          </div>
        </Link>

        {/* Icono menu mobile */}
        <div className="block md:hidden cursor-pointer">
          <EllipsisVertical />
        </div>

        {/* Menu desktop */}
        <div className="hidden md:flex flex-between gap-3">
          {navLinks.map((nl) => (
            <AppLink key={nl.label} href={nl.url}>
              {nl.label}
            </AppLink>
          ))}
        </div>

        <div className="hidden md:block">
          <AppLink href={appRoutes.CART.BASE}>
            <ShoppingCart />
          </AppLink>
        </div>
      </div>
    </nav>
  );
};
