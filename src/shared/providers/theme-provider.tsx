"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <NextThemesProvider
    attribute="data-theme"
    defaultTheme="light"
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </NextThemesProvider>
);
