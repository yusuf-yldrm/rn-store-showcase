import { request } from "../instance";

/// Endpoints
//  1. Get All Products

export const getAllProducts: any = () =>
  request({
    url: "/products",
  });
