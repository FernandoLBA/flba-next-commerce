import { PropsWithChildren } from "react";

export const ProductCard = ({ children }: PropsWithChildren) => {
  return (
    <>
      Product card
      {children}
    </>
  );
};
