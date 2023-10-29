import { request } from "../instance";
import type { Service } from "./types";

/// Endpoints
//  1. Get All Products

export const getAllProducts: Service.GetAllProducts = () =>
  request({
    url: "/products",
  });

export const getProductById: Service.GetProductById = (data) =>
  request({
    url: "/products/" + data?.id,
  });

// limit=10&skip=10&select=title,price
export const searchProducts: Service.SearchProducts = (data) => {
  console.log({ data });
  return request({
    url: "/products/search?q=" + data?.q,
  });
};
export const getProductCategories: any = () =>
  request({
    url: "/products/categories",
  });

// Get products of a categorye
export const getProductsByCategory: any = (data: { category: string }) =>
  request({
    url: "/products/category/" + data.category,
  });
