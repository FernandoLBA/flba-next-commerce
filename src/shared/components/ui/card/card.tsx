import { cn } from "@/shared/utils/cn";
import { ComponentProps } from "react";

export const Card = ({ className, ...props }: ComponentProps<"article">) => (
  <article className={cn("", className)} {...props} />
);

export const CardMedia = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("", className)} {...props} />
);

export const CardContent = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("", className)} {...props} />
);

export const CardTitle = ({ className, ...props }: ComponentProps<"h3">) => (
  <h3 className={cn("", className)} {...props} />
);

export const CardDescription = ({
  className,
  ...props
}: ComponentProps<"p">) => <p className={cn("", className)} {...props} />;

export const CardFooter = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn("", className)} {...props} />
);
