import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import AddCartButton from "../../src/components/AddCartButton";
import {
  InterBoldText,
  InterMediumText,
} from "../../src/components/Theme/StyledText";
import ImageSlider from "../../src/components/Utils/ImageSlider";
import jsStore from "../../src/services/network";
import { useAppSelector } from "../../src/store/hooks";
import { addNewItem, cartStateData } from "../../src/store/slices/cart/reducer";
import {
  addNewFavoriteItem,
  favoriteStateData,
  removeFavoriteItem,
} from "../../src/store/slices/favorite/reducer";
import { ProductItem } from "../../src/types/Product";
import calculateDiscountedPrice from "../../src/utils/CalculateDiscount";

const ProductScreen = () => {
  const { id } = useLocalSearchParams();
  const favoriteItems = useAppSelector((state) => favoriteStateData(state));
  const products = useAppSelector((state) => cartStateData(state));

  const [product, setProduct] = useState<ProductItem>();
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorited] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [itemInCart, setItemInCart] = useState(false);

  const addCartNewItem = () => {
    if (product == undefined) {
      alert("An error happening");
      return;
    }

    dispatch(
      addNewItem({
        product: product,
        quantity: 0,
      })
    );
  };

  const toggleFavorite = () => {
    if (product == undefined) {
      alert("An error happening");
      return;
    }

    setIsFavorited(!isFavorite);
    if (isFavorite) {
      dispatch(removeFavoriteItem(product.id));
    } else {
      dispatch(addNewFavoriteItem(product));
    }
  };

  const checkFavorite = () => {
    if (product == undefined) {
      return;
    }

    const theItem = favoriteItems.find(
      //@ts-ignore
      (item) => item.id === product.id
    );
    if (theItem) {
      setIsFavorited(true);
    } else {
      setIsFavorited(false);
    }
  };

  const checkInCart = () => {
    //@ts-ignore
    const item = products.find((item) => item.product.id == id);

    if (item) {
      setItemInCart(true);
      return true;
    } else {
      setItemInCart(false);
      return false;
    }
  };

  const getProductDetails = async () => {
    try {
      setLoading(true);
      checkInCart();
      const [data, err] = await jsStore.product.getProductById({
        id: typeof id == "string" ? id : id[0],
      });
      if (err != null) {
        throw err;
      }
      navigation.setOptions({
        title: data?.title,
      });

      setProduct(data);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);

      console.error({
        title: "Product Page > Get Product details",
        err,
      });
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id, navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable
            style={{
              padding: 10,
            }}
            onPress={() => {
              toggleFavorite();
            }}
          >
            <FontAwesome
              size={20}
              style={{ marginBottom: -3 }}
              name={isFavorite ? "heart" : "heart-o"}
              color={isFavorite ? "red" : "black"}
            />
          </Pressable>
        );
      },
    });
    checkFavorite();
  }, [isFavorite, product]);

  useEffect(() => {
    checkInCart();
  }, [products]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <View style={styles.imageContainer}>
        <ImageSlider images={product?.images || []} />
        <View style={styles.discountBox}>
          <InterBoldText style={styles.discountText}>
            %{product?.discountPercentage.toFixed(0)}
          </InterBoldText>
        </View>
      </View>

      <View style={styles.productContainer}>
        <View style={styles.productHeader}>
          <InterBoldText style={styles.title}>{product?.title}</InterBoldText>
          <View style={styles.priceContainer}>
            <InterBoldText style={styles.price}>
              {product?.price} TL
            </InterBoldText>
            <InterBoldText style={styles.discountPrice}>
              {calculateDiscountedPrice(
                product?.price,
                product?.discountPercentage
              ).toFixed(0)}{" "}
              TL
            </InterBoldText>
          </View>
        </View>
        <View>
          <InterMediumText style={styles.descriptionText}>
            {product?.description}
          </InterMediumText>
        </View>
      </View>

      <AddCartButton
        inCart={itemInCart}
        onPress={() => {
          if (itemInCart) {
            router.push("/(tabs)/basket");
          } else {
            addCartNewItem();
            alert(product?.title + "added to the cart.");
          }
        }}
        productId={product?.id.toString()}
      />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    gap: 10,
  },
  productContainer: {
    gap: 10,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 20,
  },
  productHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  priceContainer: { flexDirection: "row", gap: 5, alignItems: "flex-end" },
  price: {
    fontSize: 13,
    textDecorationLine: "line-through",
    color: "gray",
  },
  discountPrice: {
    fontSize: 15,
  },
  imageContainer: {
    position: "relative",
  },
  discountBox: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    padding: 5,
    borderRadius: 100,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  discountText: {
    color: "white",
    fontSize: 14,
  },
  descriptionText: {
    color: "#645E5E",
  },
});
