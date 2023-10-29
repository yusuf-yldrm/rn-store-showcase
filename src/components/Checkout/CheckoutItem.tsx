import * as React from "react";
import { StyleSheet, View } from "react-native";
import { InterBoldText } from "../Theme/StyledText";

interface CheckoutItemProps {
  title: string;
  count: number;
  type?: string;
}

const CheckoutItem = (props: CheckoutItemProps) => {
  const { title, count, type } = props;
  return (
    <View style={styles.container}>
      <InterBoldText>{title}</InterBoldText>
      <InterBoldText>
        {count} {type || "TL"}
      </InterBoldText>
    </View>
  );
};

export default CheckoutItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
});
