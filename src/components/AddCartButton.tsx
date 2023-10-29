import * as React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { InterBoldText } from "./Theme/StyledText";

interface AddCartButtonProps {
  productId: string | undefined;
  inCart: boolean;
  onPress: () => void;
}

const AddCartButton = (props: AddCartButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <InterBoldText style={styles.text}>
        {props.inCart ? "Already in Cart" : "ADD TO CART"}
      </InterBoldText>
    </TouchableOpacity>
  );
};

export default AddCartButton;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",

    width: "80%",
    backgroundColor: "#BAB9B9",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontSize: 18,
    textTransform: "uppercase",
  },
});
