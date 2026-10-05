import { cn } from "@/shared/utils/cn";
import { ComponentProps, useEffect, useRef } from "react";
import styles from "./app-drawer.module.css";

type AppDrawerProps = Omit<ComponentProps<"dialog">, "open" | "onClose"> & {
  open: boolean;
  onClose: () => void;
  side?: "right" | "left";
};

export const AppDrawer = ({
  open,
  onClose,
  className,
  side = "right",
  children,
  ...props
}: AppDrawerProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={cn(styles.drawer, styles[side], className)}
      onClose={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      {...props}
    >
      <div className={styles.inner}>{children}</div>
    </dialog>
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
