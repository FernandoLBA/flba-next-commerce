import { cn } from "@/shared/utils/cn";
import { ComponentProps } from "react";
import styles from "./card.module.css";

export const Card = ({ className, ...props }: ComponentProps<"article">) => (
  <article className={cn(styles.card, className)} {...props} />
);

export const CardMedia = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn(styles.media, className)} {...props} />
);

export const CardContent = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn(styles.content, className)} {...props} />
);

export const CardTitle = ({ className, ...props }: ComponentProps<"h3">) => (
  <h3 className={cn(styles.title, className)} {...props} />
);

export const CardDescription = ({
  className,
  ...props
}: ComponentProps<"p">) => (
  <p className={cn(styles.description, className)} {...props} />
);

export const CardFooter = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={cn(styles.footer, className)} {...props} />
);
