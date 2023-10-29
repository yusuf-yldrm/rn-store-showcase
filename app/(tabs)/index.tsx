import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";

import { useEffect, useState } from "react";
import { ProductCard } from "../../src/components/ProductCard";
import {
  InterBoldText,
  InterMediumText,
} from "../../src/components/StyledText";
import { View } from "../../src/components/Themed";
import jsStore from "../../src/services/network";

export default function DiscoverScreen() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      setLoading(true);
      const [data, err] = await jsStore.product.getAllProducts();
      if (err != null) {
        throw err;
      }

      setProducts(data.products);
      setLoading(false);
    } catch (err: any) {
      console.error({
        title: "Discover > Get Products",
        err,
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{ display: "flex", width: "100%", flexDirection: "row", gap: 4 }}
      >
        <InterBoldText>Products</InterBoldText>
        <InterBoldText>(Toplam 16 adet)</InterBoldText>
      </View>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput style={styles.searchInput} placeholder="Search a product" />
        <InterMediumText>Filter</InterMediumText>
        <InterMediumText>Sort</InterMediumText>
      </View>

      {loading ? (
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={products}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          renderItem={({ item, index }) => (
            <ProductCard key={item.id} product={item} />
          )}
          style={styles.productList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 9,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  searchInput: {
    borderWidth: 2,
    height: 30,
    width: "70%",
    paddingHorizontal: 5,
    borderColor: "gray",
    borderRadius: 10,
  },
  productList: {
    width: "100%",
  },
});
