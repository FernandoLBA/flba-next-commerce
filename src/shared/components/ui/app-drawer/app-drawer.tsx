import { cn } from "@/shared/utils/cn";
import { ComponentProps } from "react";

export const AppDrawer = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "w-full md:w-80 bg-background right-0 bottom-0 border-0 md:border-l border-primary z-8 h-dvh pt-15 fixed",
        className,
      )}
      {...props}
    >
      <div className="flex-y-between h-full">{props.children}</div>
    </div>
  );
};

export const AppDrawerContent = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return <div className={cn("", className)} {...props} />;
};

export const AppDrawerTitle = ({
  className,
  ...props
}: ComponentProps<"p">) => {
  return <p className={cn("", className)} {...props} />;
};

export const AppDrawerDescription = ({
  className,
  ...props
}: ComponentProps<"p">) => {
  return <p className={cn("", className)} {...props} />;
};

export const AppDrawerFooter = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return <div className={cn("", className)} {...props} />;
};
