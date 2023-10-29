import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AddCartButton from "../../src/components/AddCartButton";
import {
  InterBoldText,
  InterMediumText,
} from "../../src/components/Theme/StyledText";
import ImageSlider from "../../src/components/Utils/ImageSlider";
import jsStore from "../../src/services/network";

const ProductScreen = () => {
  const { id } = useLocalSearchParams();

  const [product, setProduct] = useState<ProductItem>();
  const [loading, setLoading] = useState(false);

  const getProductDetails = async () => {
    try {
      setLoading(true);
      const [data, err] = await jsStore.product.getProductById({
        id: typeof id == "string" ? id : id[0],
      });
      if (err != null) {
        throw err;
      }

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
  }, [id]);

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

      <AddCartButton productId={product?.id.toString()} />
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
