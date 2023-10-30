import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ShippingScreenProps {}

const ShippingScreen = (props: ShippingScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>ShippingScreen</Text>
    </View>
  );
};

export default ShippingScreen;

const styles = StyleSheet.create({
  container: {},
});
