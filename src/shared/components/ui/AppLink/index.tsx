import { cn } from "@/shared/utils";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import styles from "./AppLink.module.scss";

export interface AppLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export const AppLink = ({ children, href, ...props }: AppLinkProps) => {
  return (
    <Link
      className={cn(styles.appLink, props.className)}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
};
