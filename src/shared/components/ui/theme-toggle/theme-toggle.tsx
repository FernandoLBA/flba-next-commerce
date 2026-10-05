"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { AppButton } from "../app-button/app-button";
import styles from "./theme-toggle.module.css";

const subscribe = () => () => {};

const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

const NEXT_THEME = { light: "dark", dark: "light" } as const;
const ICONS = { light: Moon, dark: Sun };
const LABELS = { light: "claro", dark: "oscuro", system: "del sistema" };

export const ThemeToggle = () => {
  const { theme = "system", setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) return <span className={styles.placeholder} />;

  const current = theme as keyof typeof NEXT_THEME;
  const Icon = ICONS[current];

  return (
    <AppButton
      type="button"
      variant="ghost"
      onClick={() => setTheme(NEXT_THEME[current])}
      aria-label={`Tema ${LABELS[current]}. Cambiar tema`}
    >
      <Icon aria-hidden />
    </AppButton>
  );
};
