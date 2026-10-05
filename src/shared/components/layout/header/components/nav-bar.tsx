"use client";

import { AppCartButton, AppLink, ThemeToggle } from "@/shared/components/ui";
import { appRoutes } from "@/shared/constants/app.routes";
import { appSettings } from "@/shared/constants/app.settings";
import { cn } from "@/shared/utils/cn";
import { Code } from "lucide-react";
import { usePathname } from "next/navigation";
import { navLinks } from "../lib/constants/nav-links";
import { MobileMenu } from "./mobile-menu/mobile-menu";

export const NavBar = () => {
  const pathname = usePathname();
  const isActive = (url: string) =>
    url === appRoutes.HOME.BASE ? pathname === url : pathname.startsWith(url);

  return (
    <nav className="w-full border-b fixed bg-black text-primary z-10">
      <div className="flex justify-between h-12 items-center px-6">
        {/* Marca */}
        <AppLink href={appRoutes.HOME.BASE}>
          <div className="flex items-center gap-1">
            <Code />

            <span className="typo-label">{appSettings.APP_NAME}</span>
          </div>
        </AppLink>

        {/* Icono menu mobile */}
        <MobileMenu />

        {/* Menu desktop */}
        <div className="hidden md:flex justify-between gap-3">
          {navLinks.map((nl) => (
            <AppLink
              className={cn(isActive(nl.url) && "underline")}
              aria-current={isActive(nl.url) ? "page" : undefined}
              key={nl.label}
              href={nl.url}
            >
              {nl.label}
            </AppLink>
          ))}
        </div>

        <div className="hidden md:block">
          <div className="flex gap-4 items-center">
            <ThemeToggle />

            <AppCartButton />
          </div>
        </div>
      </div>
    </nav>
  );
};
