import { CartProductItem } from "./Product";

export interface ICart {
  cart: CartProductItem[];
}
export interface ICartState {
  cart: {
    cart: CartProductItem[];
  };
}
