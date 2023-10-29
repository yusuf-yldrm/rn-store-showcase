import { ProductItem } from "../../../types/Product";
import { Request } from "../types";

export type GetAllProductsT = {};
export type GetAllProductsAnswer = {
  products: ProductItem[];
  total: number;
  skip: number;
  limit: number;
};

export type GetProductByIdT = {
  id: number | string;
};
export type GetProductByIdAnswer = ProductItem;

export type SearchProductsT = {
  q: string;
};
export type SearchProductsAnswer = {
  products: ProductItem[];
  total: number;
  skip: number;
  limit: number;
};

export namespace Service {
  export type GetAllProducts = Request<GetAllProductsT, GetAllProductsAnswer>;
  export type GetProductById = Request<GetProductByIdT, GetProductByIdAnswer>;
  export type SearchProducts = Request<SearchProductsT, SearchProductsAnswer>;
}
