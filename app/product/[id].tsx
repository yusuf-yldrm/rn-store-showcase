import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { InterBoldText } from "../../src/components/Theme/StyledText";
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
    <View>
      <ImageSlider images={product?.images || []} />
      <InterBoldText>{product?.title}</InterBoldText>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
