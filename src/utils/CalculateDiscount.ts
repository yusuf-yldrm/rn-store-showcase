function calculateDiscountedPrice(
  price: number = 0,
  discountPercentage: number = 0
): number {
  if (price < 0 || discountPercentage < 0 || discountPercentage > 100) {
    throw new Error(
      "Invalid input. Price and discount percentage must be non-negative, and discount percentage must be between 0 and 100."
    );
  }

  const discountAmount = (price * discountPercentage) / 100;
  const discountedPrice = price - discountAmount;

  return discountedPrice;
}

export default calculateDiscountedPrice;
