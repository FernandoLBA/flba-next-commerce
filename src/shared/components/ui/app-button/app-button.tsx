import { cn } from "@/shared/utils/cn";
import { ComponentProps } from "react";
import styles from "./app-button.module.css";

type AppButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "outline" | "ghost";
};

const variantClasses = {
  default: styles.variantDefault,
  outline: styles.variantOutline,
  ghost: styles.variantGhost,
};

export const AppButton = ({
  className,
  variant = "default",
  type = "button",
  ...props
}: AppButtonProps) => (
  <button
    type={type}
    className={cn(styles.button, variantClasses[variant], className)}
    {...props}
  />
);
