import { cn } from "@/shared/utils/cn";
import { ComponentProps } from "react";
import styles from "./app-drawer.module.css";

type AppDrawerProps = ComponentProps<"div"> & {
  side?: "right" | "left";
};

export const AppDrawer = ({
  className,
  side = "right",
  children,
  ...props
}: AppDrawerProps) => {
  return (
    <div className={cn(styles.drawer, styles[side], className)} {...props}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
};

export const AppDrawerContent = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return <div className={cn(styles.content, className)} {...props} />;
};

export const AppDrawerTitle = ({
  className,
  ...props
}: ComponentProps<"p">) => {
  return <p className={cn(styles.title, className)} {...props} />;
};

export const AppDrawerDescription = ({
  className,
  ...props
}: ComponentProps<"p">) => {
  return <p className={cn(styles.description, className)} {...props} />;
};

export const AppDrawerFooter = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return <div className={cn(styles.footer, className)} {...props} />;
};
