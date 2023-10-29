import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import {
  addNewItem,
  decreaseQuantityItem,
  removeCartItem,
} from "../../../store/slices/cart/reducer";
import { CartProductItem } from "../../../types/Product";
import calculateDiscountedPrice from "../../../utils/CalculateDiscount";
import { InterBoldText } from "../../Theme/StyledText";

const CheckoutCard = ({
  cartProduct,
  productIdx,
}: {
  cartProduct: CartProductItem;
  productIdx: number;
  quantity: number;
}) => {
  const [isDiscounted, setIsDiscounted] = useState(false);
  const dispatch = useDispatch();
  const { product, quantity } = cartProduct;

  useEffect(() => {
    if (product.discountPercentage > 0) {
      setIsDiscounted(true);
    } else {
      setIsDiscounted(false);
    }
  }, [product]);

  //@ts-ignore
  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton
        style={styles.trashButton}
        onPress={() => {
          alert(product.title + " Removed From Cart");
          dispatch(removeCartItem(productIdx));
        }}
      >
        <FontAwesome name="trash" size={18} color={"white"} />
      </RectButton>
    );
  };

  const addQuantity = () => {
    dispatch(
      addNewItem({
        product,
        quantity,
      })
    );
  };

  const decreaseQuantity = () => {
    dispatch(decreaseQuantityItem(productIdx));
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.productItem}>
        <Pressable
          onPress={() => {
            router.push(`/product/${product.id}`);
          }}
        >
          <Image
            source={{ uri: product.thumbnail }}
            style={styles.productImage}
          />
        </Pressable>

        <View style={styles.textArea}>
          <Pressable
            onPress={() => {
              router.push(`/product/${product.id}`);
            }}
          >
            <InterBoldText style={styles.title} numberOfLines={1}>
              {product.title}
            </InterBoldText>
          </Pressable>
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
            <Pressable
              style={styles.countButton}
              onPress={() => {
                decreaseQuantity();
              }}
            >
              <FontAwesome name="minus" />
            </Pressable>
            <InterBoldText>{quantity}</InterBoldText>

            <Pressable
              style={styles.countButton}
              onPress={() => {
                addQuantity();
              }}
            >
              <FontAwesome name="plus" />
            </Pressable>
          </View>
        </View>
      </View>
    </Swipeable>
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
    gap: 9,
  },
  countButton: {
    backgroundColor: "#A7A7A7",
    borderRadius: 2,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutContainer: {
    flexDirection: "row",

    gap: 4,
  },
  trashIcon: {},
  trashButton: {
    padding: 4,
    borderRadius: 10,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
});
