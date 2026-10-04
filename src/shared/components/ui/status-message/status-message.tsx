import { cn } from "@/shared/utils/cn";
import type { ComponentProps, ReactNode } from "react";

type StatusMessageProps = Omit<ComponentProps<"section">, "title"> & {
  code?: string;
  icon?: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export const StatusMessage = ({
  code,
  icon,
  title,
  description,
  actions,
  className,
  children,
  ...props
}: StatusMessageProps) => (
  <section
    className={cn(
      "flex flex-col items-center justify-center gap-4 py-16 text-center md:py-24",
      className,
    )}
    {...props}
  >
    {icon}

    {code && (
      <p
        aria-hidden
        className="text-7xl font-bold text-primary-text md:text-9xl"
      >
        {code}
      </p>
    )}

    <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>

    {description && <p className="max-w-md text-muted">{description}</p>}

    {actions && (
      <div className="mt-4 flex flex-wrap justify-center gap-3">{actions}</div>
    )}

    {children}
  </section>
);
