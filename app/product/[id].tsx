import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import AddCartButton from "../../src/components/AddCartButton";
import {
  InterBoldText,
  InterMediumText,
} from "../../src/components/Theme/StyledText";
import ImageSlider from "../../src/components/Utils/ImageSlider";
import jsStore from "../../src/services/network";
import { addNewItem } from "../../src/store/slices/cart/reducer";
import { ProductItem } from "../../src/types/Product";

const ProductScreen = () => {
  const { id } = useLocalSearchParams();

  const [product, setProduct] = useState<ProductItem>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addCartNewItem = () => {
    if (product == undefined) {
      alert("An error happening");
      return;
    }

    dispatch(addNewItem(product));
  };

  // useEffect(() => {
  //   if (loading == false) {

  //   }
  // }, [navigation]);

  const getProductDetails = async () => {
    try {
      setLoading(true);
      const [data, err] = await jsStore.product.getProductById({
        id: typeof id == "string" ? id : id[0],
      });
      if (err != null) {
        throw err;
      }
      navigation.setOptions({
        title: data?.title,
        headerRight: () => {
          return (
            <View>
              <FontAwesome
                size={20}
                style={{ marginBottom: -3 }}
                name="heart"
              />
            </View>
          );
        },
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

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <ImageSlider images={product?.images || []} />

      <View style={styles.productContainer}>
        <View style={styles.productHeader}>
          <InterBoldText style={styles.title}>{product?.title}</InterBoldText>
          <InterBoldText style={styles.price}>
            {product?.price} TL
          </InterBoldText>
        </View>
        <View>
          <InterMediumText>{product?.description}</InterMediumText>
        </View>
      </View>

      <AddCartButton
        onPress={() => {
          alert("pressed");
          addCartNewItem();
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
  price: {
    fontSize: 15,
  },
});
