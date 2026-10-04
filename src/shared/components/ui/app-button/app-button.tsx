import { cn } from "@/shared/utils/cn";
import { ComponentProps } from "react";

type AppButtonProps = ComponentProps<"button"> & {
  variant?: "default" | "outline" | "ghost";
};

const variants = {
  default: "bg-primary text-primary-foreground",
  outline: "bg-transparent border border-primary text-primary",
  ghost: "p-0 bg-transparent text-primary cursor-pointer",
};

export const AppButton = ({
  className,
  variant = "default",
  type = "button",
  ...props
}: AppButtonProps) => (
  <button
    type={type}
    className={cn(
      "px-9 py-2 rounded-md text-sm hover:opacity-80",
      variants[variant],
      className,
    )}
    {...props}
  />
);
