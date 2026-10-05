export type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  stock: number;
  quantity: number;
};

export type CartItemInput = Omit<CartItem, "quantity">;
