import { yupResolver } from "@hookform/resolvers/yup";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as yup from "yup";
import {
  InterBoldText,
  InterRegularText,
} from "../src/components/Theme/StyledText";
interface CheckoutScreenProps {}

const CheckoutScreen = (props: CheckoutScreenProps) => {
  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    phoneNumber: yup.number().required("Phone Number is required"),
    name: yup.string().required("Name is required"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      phoneNumber: 0,
    },
  });
  const onPressSend = (formData: any) => {
    console.log({ formData });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }: any) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                keyboardType="default"
                placeholder="Name"
                style={styles.inputStyle}
              />
            )}
            name="name"
          />
          {errors.name && (
            <InterBoldText style={styles.errorMessageText}>
              {errors.name.message}
            </InterBoldText>
          )}
        </View>
        <View style={styles.inputGroup}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }: any) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                placeholder="Email"
                style={styles.inputStyle}
              />
            )}
            name="email"
          />
          {errors.email && (
            <InterBoldText style={styles.errorMessageText}>
              {errors.email.message}
            </InterBoldText>
          )}
          {/* Render other form inputs and their corresponding error messages */}
        </View>
        <View style={styles.inputGroup}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }: any) => (
              <TextInput
                value={value.toString()}
                onChangeText={onChange}
                keyboardType="phone-pad"
                placeholder="Phone Number"
                style={styles.inputStyle}
              />
            )}
            name="phoneNumber"
          />
          {errors.phoneNumber && (
            <InterBoldText style={styles.errorMessageText}>
              {errors.phoneNumber.message}
            </InterBoldText>
          )}
          {/* Render other form inputs and their corresponding error messages */}
        </View>

        <Pressable
          style={[styles.payButton, !isValid && styles.disabledButton]}
          onPress={() => {
            handleSubmit(onPressSend);
          }}
          disabled={isValid}
        >
          <InterRegularText style={styles.payText}>PAY</InterRegularText>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
    flex: 1,
  },
  inputGroup: {
    gap: 4,
  },
  payButton: {
    position: "absolute",
    bottom: 60,
    paddingVertical: 20,
    width: "80%",
    alignSelf: "center",
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "black",
  },
  inputStyle: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  errorMessageText: {
    color: "red",
    fontSize: 12,
  },
  payText: {
    color: "white",
    fontSize: 20,
  },
  disabledButton: {
    backgroundColor: "#BAB9B9",
  },
});
