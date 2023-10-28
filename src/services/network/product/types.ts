import { Request } from "../types";

export type GetAllProductsT = {};
export type GetAllProductsAnswer = {
  notes:
    | {
        _id: string;
        title: string;
        content: string;
        course: string;
        user: string;
        courseContentId: string;
        priority: string;
        created_at: string;
        updated_at: string;
      }[]
    | never[];
};

export namespace Service {
  export type GetAllProducts = Request<GetAllProductsT, GetAllProductsAnswer>;
}
