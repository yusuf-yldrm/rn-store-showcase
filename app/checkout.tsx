import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

interface CheckoutScreenProps {}

const CheckoutScreen = (props: CheckoutScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>CheckoutScreen</Text>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {},
});
