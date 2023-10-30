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

export type GetProductsByCategoryT = {
  category: string;
};
export type GetProductsByCategoryAnswer = {
  products: ProductItem[];
  total: number;
  skip: number;
  limit: number;
};

export type GetCategoriesT = {};
export type GetCategoriesAnswer = string[];

export namespace Service {
  export type GetAllProducts = Request<GetAllProductsT, GetAllProductsAnswer>;
  export type GetProductById = Request<GetProductByIdT, GetProductByIdAnswer>;
  export type GetProductsByCategory = Request<
    GetProductsByCategoryT,
    GetProductsByCategoryAnswer
  >;

  export type GetCategories = Request<GetCategoriesT, GetCategoriesAnswer>;

  export type SearchProducts = Request<SearchProductsT, SearchProductsAnswer>;
}
