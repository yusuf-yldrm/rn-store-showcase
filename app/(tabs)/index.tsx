import { StyleSheet, TextInput } from "react-native";

import { useEffect, useState } from "react";
import { View } from "../../src/components/Themed";
import jsStore from "../../src/services/network";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { selectCount } from "../../src/store/slices/counterSlice";
export default function DiscoverScreen() {
  const [incrementAmount, setIncrementAmount] = useState("2");

  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector(selectCount);
  const status = useAppSelector((state) => state.counter.status);
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const [data, err] = await jsStore.product.getAllProducts();
    console.log(data, err);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput style={styles.searchInput} placeholder="Search a product" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    borderWidth: 2,
    height: 30,
    borderColor: "white",
    width: "100%",
    borderRadius: 10,
  },
});
