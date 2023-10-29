import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { addNewItem } from "../../store/slices/cart/reducer";
import {
  addNewFavoriteItem,
  removeFavoriteItem,
} from "../../store/slices/favorite/reducer";
import { ProductItem } from "../../types/Product";
import { InterBoldText } from "../Theme/StyledText";

interface FavoriteCardProps {
  product: ProductItem;
}

const FavoriteCard = (props: FavoriteCardProps) => {
  const { product } = props;
  const { favorite, cart } = useAppSelector((item) => item);
  const favorites = favorite.favorite;
  const products = cart.cart;
  const dispatch = useDispatch();

  const [isFavorited, setIsFavorited] = useState(false);
  const [itemInCart, setItemInCart] = useState(false);

  const toggleFavorite = () => {
    //@ts-ignore
    const isInFavorites = favorites.find((item) => item.id == product.id);

    if (isInFavorites) {
      dispatch(removeFavoriteItem(product.id));
    } else {
      dispatch(addNewFavoriteItem(product));
    }
  };

  useEffect(() => {
    //@ts-ignore
    const isInFavorites = favorites.find((item) => item.id == product.id);
    //@ts-ignore
    const isInCart = products.find((item) => item.product.id == product.id);

    if (isInCart) {
      setItemInCart(true);
    } else {
      setItemInCart(false);
    }

    if (isInFavorites) {
      setIsFavorited(true);
    } else {
      setIsFavorited(false);
    }
  }, [favorites, products]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          router.push(`/product/${product.id}`);
        }}
      >
        <Image
          source={{
            uri: product.thumbnail,
          }}
          style={styles.productImage}
        />
      </Pressable>

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
      <Pressable
        style={styles.addToCartButton}
        onPress={() => {
          if (itemInCart) {
            router.push("/(tabs)/basket");
          } else {
            dispatch(addNewItem({ product, quantity: 1 }));
          }
        }}
      >
        <FontAwesome name={itemInCart ? "shopping-basket" : "plus"} />
      </Pressable>
      <Pressable style={styles.favoriteButton} onPress={toggleFavorite}>
        <FontAwesome
          name={isFavorited ? "heart" : "heart-o"}
          color={isFavorited ? "red" : "black"}
          size={15}
        />
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
