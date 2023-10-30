import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
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
import ConfettiCannon from "react-native-confetti-cannon";
import * as yup from "yup";
import { InterBoldText } from "../src/components/Theme/StyledText";

interface CheckoutScreenProps {}
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  name: yup.string().min(3).required("Name is required"),
});

const CheckoutScreen = (props: CheckoutScreenProps) => {
  const [startConfetti, setStartConfetti] = React.useState(false);
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
      phoneNumber: "",
    },
  });
  const onPressSend = (formData: any) => {
    console.log({ formData });
  };

  const onInvalid = (errors: any) => console.error(errors);
  const ConfettiRef = React.useRef(null);

  const handleConfetti = () => {
    //@ts-ignore
    ConfettiRef && ConfettiRef.current?.start();
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
                value={value}
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
            if (isValid) {
              handleConfetti();
              setTimeout(() => {
                router.push("/shipping");
              }, 1500);
            } else {
              alert("Check From Fields");
            }
            // not working i will check after the review progress
            // handleSubmit(onPressSend, onInvalid);
          }}
        >
          <InterBoldText style={styles.payText}>PAY</InterBoldText>
        </Pressable>
        <ConfettiCannon
          count={200}
          origin={{ x: -10, y: 0 }}
          autoStart={startConfetti}
          ref={ConfettiRef}
        />
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
    paddingVertical: 14,
    width: "80%",
    alignSelf: "center",
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "black",
  },
  inputStyle: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 6,
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
