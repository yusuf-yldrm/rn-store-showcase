import { ProductItem } from "./Product";

export interface IFavorite {
  favorite: ProductItem[];
}
export interface IFavoriteState {
  favorite: {
    favorite: ProductItem[];
  };
}
