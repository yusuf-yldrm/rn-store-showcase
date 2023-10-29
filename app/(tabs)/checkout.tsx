import { FlatList, Pressable, StyleSheet } from "react-native";

import { useEffect, useState } from "react";
import CheckoutItem from "../../src/components/Checkout/CheckoutItem";
import EmptyScreen from "../../src/components/Checkout/EmptyScreen";
import CheckoutCard from "../../src/components/CheckoutCard/CheckoutCard";
import { InterBoldText } from "../../src/components/Theme/StyledText";
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

      <View style={styles.checkoutContainer}>
        <CheckoutItem count={0} title="Price" />
        <CheckoutItem count={10} title="Price" />
        <CheckoutItem count={10} title="Price" />
      </View>
      <Pressable style={styles.checkoutButton}>
        <InterBoldText style={styles.checkoutText}>Checkout</InterBoldText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutContainer: {
    flex: 0.3,
    height: 100,
    width: "100%",
    gap: 3,
  },
  list: {
    flex: 0.6,
    width: "100%",
    paddingHorizontal: 10,
  },
  checkoutButton: {
    backgroundColor: "gray",
    width: "80%",
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 20,
    position: "absolute",
    bottom: 20,
  },
  checkoutText: {
    color: "white",
    fontSize: 18,
    textTransform: "uppercase",
  },
});
