import { cn } from "@/shared/utils/cn";
import { ComponentProps } from "react";
import styles from "./app-badge.module.css";

type AppBadgeProps = ComponentProps<"div"> & {
  variant?: "success" | "warning" | "destructive" | "muted";
};

export const AppBadge = ({
  className,
  variant = "success",
  ...props
}: AppBadgeProps) => {
  return (
    <div
      className={cn(styles.badge, styles[variant], className)}
      {...props}
    />
  );
};
