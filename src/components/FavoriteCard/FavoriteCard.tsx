import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { ProductItem } from "../../types/Product";
import { InterBoldText } from "../Theme/StyledText";

interface FavoriteCardProps {
  product: ProductItem;
}

const FavoriteCard = (props: FavoriteCardProps) => {
  const { product } = props;
  console.log(product.thumbnail);
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: product.thumbnail,
        }}
        style={styles.productImage}
      />

      <View style={styles.productDetailContainer}>
        <InterBoldText numberOfLines={1} style={styles.title}>
          {product.title}
        </InterBoldText>
        <InterBoldText numberOfLines={1} style={styles.desc}>
          {product.description}
        </InterBoldText>
        <InterBoldText numberOfLines={1} style={styles.price}>
          {product.price}
        </InterBoldText>
      </View>
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
  },
  productImage: {
    width: "100%",
    borderRadius: 10,

    height: 115,
  },
  productDetailContainer: {
    gap: 10,
  },
  title: {},
  price: {},
  desc: {
    fontSize: 10,
    color: "gray",
  },
});
