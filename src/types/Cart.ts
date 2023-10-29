import { ProductItem } from "./Product";

export interface ICart {
  cart: ProductItem[];
}
export interface ICartState {
  cart: {
    cart: ProductItem[];
  };
}
