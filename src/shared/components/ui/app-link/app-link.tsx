import { cn } from "@/shared/utils/cn";
import Link from "next/link";
import { ComponentProps } from "react";
import styles from "./app-link.module.css";

export type AppLinkProps = ComponentProps<typeof Link> & {
  variant?: "link" | "button" | "outline";
};

export const AppLink = ({
  className,
  variant = "link",
  ...props
}: AppLinkProps) => {
  return (
    <Link className={cn(styles.base, styles[variant], className)} {...props} />
  );
};
