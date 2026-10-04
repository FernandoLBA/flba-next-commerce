import { cn } from "@/shared/utils/cn";
import { ComponentProps } from "react";

export const Card = ({ className, ...props }: ComponentProps<"article">) => (
  <article
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-lg border border-primary",
      className,
    )}
    {...props}
  />
);

export const CardMedia = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn(
      "relative aspect-square overflow-hidden border-b border-primary",
      className,
    )}
    {...props}
  />
);

export const CardContent = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("flex-1 p-3 md:p-4", className)} {...props} />
);

export const CardTitle = ({ className, ...props }: ComponentProps<"h3">) => (
  <h3 className={cn("text-primary font-semibold", className)} {...props} />
);

export const CardDescription = ({
  className,
  ...props
}: ComponentProps<"p">) => (
  <p className={cn("uppercase", className)} {...props} />
);

export const CardFooter = ({ className, ...props }: ComponentProps<"div">) => (
  <div
    className={cn("mt-auto w-full border-t border-primary", className)}
    {...props}
  />
);
