import { cn } from "@/shared/utils/cn";
import Link from "next/link";
import { ComponentProps } from "react";

export type AppLinkProps = ComponentProps<typeof Link>;

export const AppLink = ({ className, ...props }: AppLinkProps) => {
  return <Link className={cn("text-sm text-primary hover:opacity-80", className)} {...props} />;
};
