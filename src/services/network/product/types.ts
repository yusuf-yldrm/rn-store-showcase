import { Request } from "../types";

export type GetAllProductsT = {};
export type GetAllProductsAnswer = {
  products: ProductItem[];
  total: number;
  skip: number;
  limit: number;
};

export namespace Service {
  export type GetAllProducts = Request<GetAllProductsT, GetAllProductsAnswer>;
}
