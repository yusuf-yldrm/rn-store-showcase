import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { ProductItem } from "../../types/Product";
import calculateDiscountedPrice from "../../utils/CalculateDiscount";
import { InterBoldText, InterRegularText } from "../Theme/StyledText";
const placeholderImage = require("../../../assets/animations/placeholder.gif");

const ProductCard = ({ product }: { product: ProductItem }) => {
  return (
    <Pressable
      onPress={() => {
        router.push(`/product/${product.id}`);
      }}
    >
      <View style={styles.productItem}>
        <Image
          defaultSource={placeholderImage}
          source={{ uri: product.thumbnail }}
          style={styles.productImage}
        />
        <View style={styles.textArea}>
          <InterBoldText style={styles.title} numberOfLines={1}>
            {product.title}
          </InterBoldText>
          <InterRegularText style={styles.desc} numberOfLines={2}>
            {product.description}
          </InterRegularText>
        </View>
        <View style={styles.priceArea}>
          <InterBoldText style={styles.price}>
            {calculateDiscountedPrice(
              product.price,
              product.discountPercentage
            ).toFixed() + " TL"}
          </InterBoldText>
          <InterRegularText style={styles.originalPrice}>
            {product.price} TL
          </InterRegularText>
        </View>
      </View>
    </Pressable>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productItem: {
    backgroundColor: "#D9D9D9",
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 5,
    gap: 10,
    borderRadius: 10,
    justifyContent: "flex-start",
  },
  productImage: {
    width: 60,
    height: "100%",
    borderRadius: 5,
  },
  textArea: {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: "100%",
  },
  title: {
    fontSize: 14,
    maxWidth: "80%",
  },
  desc: {
    fontSize: 10,
    maxWidth: 120,
    maxHeight: 40,
  },
  priceArea: { display: "flex", alignItems: "flex-end" },
  price: {},
  originalPrice: {
    textAlign: "right",
    textDecorationLine: "line-through",
    color: "gray",
  },
  countArea: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  countButton: {
    backgroundColor: "#A7A7A7",
    borderRadius: 2,
    width: 20,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutContainer: {
    flexDirection: "row",

    gap: 4,
  },
  trashIcon: {},
});
