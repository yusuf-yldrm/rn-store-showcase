import { request } from "../instance";

/// Endpoints
//  1. Get All Products

export const getAllProducts: any = () =>
  request({
    url: "/products",
  });

export const getProductById: any = (data: { id: string }) =>
  request({
    url: "/products/" + data.id,
  });

// limit=10&skip=10&select=title,price
export const searchProducts: any = (data: { query: string }) =>
  request({
    url: "/products",
    params: {
      q: data.query,
    },
  });

export const getProductCategories: any = () =>
  request({
    url: "/products/categories",
  });

// Get products of a categorye
export const getProductsByCategory: any = (data: { category: string }) =>
  request({
    url: "/products/category/" + data.category,
  });