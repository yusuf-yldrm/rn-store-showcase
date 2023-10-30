import { ProductItem } from "../types/Product";
import { SortType } from "../types/Sort";

function compareProducts(
  a: ProductItem,
  b: ProductItem,
  sortType: SortType
): number {
  switch (sortType) {
    case SortType.DISCOUNT:
      return a.discountPercentage - b.discountPercentage;
    case SortType.PRICE_ASC:
      return a.price - b.price;
    case SortType.PRICE_DESC:
      return b.price - a.price;
    default:
      throw new Error(`Invalid sort type: ${sortType}`);
  }
}

export { compareProducts };
