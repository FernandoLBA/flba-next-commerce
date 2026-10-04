import { cn } from "@/shared/utils/cn";
import Link from "next/link";
import { ComponentProps } from "react";
import styles from "./AppLink.module.scss";

export type AppLinkProps = ComponentProps<typeof Link>;

export const AppLink = ({ className, ...props }: AppLinkProps) => {
  return <Link className={cn(styles.appLink, className)} {...props} />;
};
