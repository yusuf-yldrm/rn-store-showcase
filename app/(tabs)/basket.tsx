import { FlatList, Pressable, StyleSheet } from "react-native";

import { router } from "expo-router";
import { useEffect, useState } from "react";
import CheckoutCard from "../../src/components/Checkout/CheckoutCard/CheckoutCard";
import CheckoutItem from "../../src/components/Checkout/CheckoutItem";
import EmptyScreen from "../../src/components/Checkout/EmptyScreen";
import { InterBoldText } from "../../src/components/Theme/StyledText";
import { View } from "../../src/components/Theme/Themed";
import { useAppSelector } from "../../src/store/hooks";
import { CartProductItem } from "../../src/types/Product";
import calculateDiscountedPrice from "../../src/utils/CalculateDiscount";

export default function CheckoutScreen() {
  const data = useAppSelector((items) => items.cart);
  const [products, setProducts] = useState<CartProductItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscountedPrice, setTotalDiscountedPrice] = useState(0);

  const calculateTotalPrice = () => {
    let price = 0;
    let discount = 0;
    products.map((item) => {
      price += item.product.price * item.quantity;
      discount =
        calculateDiscountedPrice(
          item.product.price,
          item.product.discountPercentage
        ) * item.quantity;
    });

    setTotalDiscountedPrice(discount);
    setTotalPrice(price);
  };

  useEffect(() => {
    setProducts(data.cart);
  }, [data.cart]);

  useEffect(() => {
    calculateTotalPrice();
  }, [products]);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        ListEmptyComponent={() => <EmptyScreen />}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item, index: idx }) => (
          <CheckoutCard
            key={item.product.id}
            cartProduct={item}
            quantity={1}
            productIdx={idx}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        style={styles.list}
      />
      {products.length > 0 && (
        <>
          <View style={styles.checkoutContainer}>
            <CheckoutItem count={totalPrice.toFixed()} title="Price" />
            <CheckoutItem
              count={(totalPrice - totalDiscountedPrice).toFixed()}
              title="Discount"
            />
            <CheckoutItem
              count={totalDiscountedPrice.toFixed()}
              title="Total"
            />
          </View>
          <Pressable
            style={styles.checkoutButton}
            onPress={() => {
              router.push("/checkout");
            }}
          >
            <InterBoldText style={styles.checkoutText}>Checkout</InterBoldText>
          </Pressable>
        </>
      )}
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
