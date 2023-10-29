import { FlatList, StyleSheet } from "react-native";

import { useEffect, useState } from "react";
import EmptyScreen from "../../src/components/Checkout/EmptyScreen";
import CheckoutCard from "../../src/components/CheckoutCard/CheckoutCard";
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
        ListEmptyComponent={() => <EmptyScreen />}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item, index: idx }) => (
          <CheckoutCard
            key={item.id}
            product={item}
            quantity={1}
            productIdx={idx}
          />
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
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
});
