import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { InterBoldText, InterRegularText } from "../StyledText";

const ProductCard = ({ product }: { product: ProductItem }) => {
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
          <InterRegularText style={styles.desc} numberOfLines={2}>
            {product.description}
          </InterRegularText>
        </View>
        <View style={styles.priceArea}>
          <InterBoldText style={styles.price}>
            {product.price && product.price + " TL"}
          </InterBoldText>
          <InterRegularText style={styles.stock}>
            {product.stock + "x"}{" "}
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
  desc: {
    fontSize: 10,
    maxWidth: 120,
    maxHeight: 40,
    textOverflow: "ellipsis",
  },
  priceArea: { display: "flex", alignItems: "flex-end" },
  price: {},
  stock: {
    textAlign: "right",
  },
});
