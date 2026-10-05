import { cn } from "@/shared/utils/cn";
import type { ComponentProps, ReactNode } from "react";
import styles from "./status-message.module.css";

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
  <section className={cn(styles.root, className)} {...props}>
    {icon}

    {code && (
      <p aria-hidden className={styles.code}>
        {code}
      </p>
    )}

    <h1 className={styles.title}>{title}</h1>

    {description && <p className={styles.description}>{description}</p>}

    {actions && <div className={styles.actions}>{actions}</div>}

    {children}
  </section>
);
