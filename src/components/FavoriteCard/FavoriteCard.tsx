import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { ProductItem } from "../../types/Product";
import { InterBoldText } from "../Theme/StyledText";

interface FavoriteCardProps {
  product: ProductItem;
}

const FavoriteCard = (props: FavoriteCardProps) => {
  const { product } = props;
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: product.thumbnail,
        }}
        style={styles.productImage}
      />

      <View style={styles.productDetailContainer}>
        <View>
          <InterBoldText numberOfLines={1} style={styles.title}>
            {product.title}
          </InterBoldText>
          <InterBoldText numberOfLines={1} style={styles.desc}>
            {product.description}
          </InterBoldText>
        </View>
        <InterBoldText numberOfLines={1} style={styles.price}>
          {product.price} TL
        </InterBoldText>
      </View>
      <Pressable style={styles.addToCartButton}>
        <FontAwesome name="plus" />
      </Pressable>
      <Pressable style={styles.favoriteButton}>
        <FontAwesome name="heart" color={"red"} size={15} />
      </Pressable>
    </View>
  );
};

export default FavoriteCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D9D9D9",
    width: "45%",
    borderRadius: 10,
    paddingBottom: 5,
    height: 200,
  },
  productImage: {
    width: "100%",
    borderRadius: 10,

    height: 115,
  },
  productDetailContainer: {
    gap: 6,
    padding: 5,
  },
  title: {},
  price: {},
  desc: {
    fontSize: 10,
    color: "gray",
  },
  addToCartButton: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 100,
  },
  favoriteButton: {
    position: "absolute",
    top: 6,
    right: 6,
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 100,
  },
});
