import { request } from "../instance";
import type { Service } from "./types";

/// Endpoints
//  1. Get All Products

export const getAllProducts: Service.GetAllProducts = () =>
  request({
    url: "/products?limit=0&select=title,price,thumbnail,description,discountPercentage",
  });

export const getProductById: Service.GetProductById = (data) =>
  request({
    url: "/products/" + data?.id,
  });

// limit=10&skip=10&select=title,price
export const searchProducts: Service.SearchProducts = (data) => {
  return request({
    url: "/products/search",
    params: {
      q: data?.q,
      select: "select=title,price,thumbnail,description,discountPercentage",
    },
  });
};
export const getProductCategories: Service.GetCategories = () =>
  request({
    url: "/products/categories",
  });

// Get products of a categorye
export const getProductsByCategory: Service.GetProductsByCategory = (data) =>
  request({
    url: "/products/category/" + data?.category,
  });
