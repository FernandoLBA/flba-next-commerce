import { CartView } from "@/features/cart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrito",
  robots: { index: false },
};

export default function CartPage() {
  return <CartView />;
}
