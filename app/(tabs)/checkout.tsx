import { FlatList, StyleSheet } from "react-native";

import { useEffect, useState } from "react";
import { ProductCard } from "../../src/components/ProductCard";
import { View } from "../../src/components/Theme/Themed";
import { useAppSelector } from "../../src/store/hooks";
import { ProductItem } from "../../src/types/Product";

export default function CheckoutScreen() {
  const data = useAppSelector((items) => items.cart);
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    setProducts(data.cart);
  }, [data.cart]);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard key={item.id} product={item} type="checkout" />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  list: {
    width: "100%",
    paddingHorizontal: 10,
  },
});
