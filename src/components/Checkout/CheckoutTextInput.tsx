import * as React from "react";
import { KeyboardTypeOptions, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface CheckoutTextInputProps {
  value: string;
  placeholder: string;
  onChange: (text: string) => void;
  keyboardType: KeyboardTypeOptions;
}

const CheckoutTextInput = ({
  onChange,
  keyboardType,
  value,
  placeholder,
}: CheckoutTextInputProps) => {
  return (
    <TextInput
      onChangeText={onChange}
      placeholder={placeholder}
      value={value}
      keyboardType={keyboardType}
      style={styles.container}
    />
  );
};

export default CheckoutTextInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
});
