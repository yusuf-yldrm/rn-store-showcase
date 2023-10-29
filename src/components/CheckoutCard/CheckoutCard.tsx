import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { removeCartItem } from "../../store/slices/cart/reducer";
import { ProductItem } from "../../types/Product";
import calculateDiscountedPrice from "../../utils/CalculateDiscount";
import { InterBoldText } from "../Theme/StyledText";

const CheckoutCard = ({
  product,
  productIdx,
  quantity,
}: {
  product: ProductItem;
  productIdx: number;
  quantity: number;
}) => {
  const [isDiscounted, setIsDiscounted] = useState(false);

  useEffect(() => {
    if (product.discountPercentage > 0) {
      setIsDiscounted(true);
    } else {
      setIsDiscounted(false);
    }
  }, [product]);

  return (
    <Pressable
      onPress={() => {
        router.push(`/product/${product.id}`);
      }}
    >
      <View style={styles.productItem}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.productImage}
        />
        <View style={styles.textArea}>
          <InterBoldText style={styles.title} numberOfLines={1}>
            {product.title}
          </InterBoldText>
          <View style={styles.priceContainer}>
            <InterBoldText style={styles.price} numberOfLines={2}>
              {calculateDiscountedPrice(
                product.price,
                product.discountPercentage
              ).toFixed()}
              TL
            </InterBoldText>
            <InterBoldText
              style={[styles.price, isDiscounted && styles.discountPrice]}
              numberOfLines={2}
            >
              {product.price} TL
            </InterBoldText>
          </View>
        </View>

        <View style={styles.checkoutContainer}>
          <View style={styles.countArea}>
            <Pressable style={styles.countButton}>
              <FontAwesome name="minus" />
            </Pressable>
            <InterBoldText>{quantity}</InterBoldText>

            <Pressable style={styles.countButton}>
              <FontAwesome name="plus" />
            </Pressable>
          </View>

          <Pressable
            onPress={() => {
              alert(productIdx);
              removeCartItem(productIdx);
            }}
            style={styles.trashButton}
          >
            <FontAwesome name="trash" size={18} color={"red"} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default CheckoutCard;

const styles = StyleSheet.create({
  productItem: {
    backgroundColor: "#D9D9D9",
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 10,
    borderRadius: 10,
    justifyContent: "flex-start",
  },
  productImage: {
    width: 60,
    height: "100%",
    backgroundSize: "cover",
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
  discountPrice: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  priceContainer: {
    flexDirection: "row",
    gap: 2,
  },
  desc: {
    fontSize: 10,
    maxWidth: 120,
    maxHeight: 40,
  },
  priceArea: { display: "flex", alignItems: "flex-end" },
  price: {},
  stock: {
    textAlign: "right",
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
  trashButton: {
    padding: 3,
  },
});
