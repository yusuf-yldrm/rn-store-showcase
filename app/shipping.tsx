import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import AnimatedLottieView from "lottie-react-native";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { InterBoldText } from "../src/components/Theme/StyledText";

interface ShippingScreenProps {}

const ShippingScreen = (props: ShippingScreenProps) => {
  const animation = React.useRef(null);

  return (
    <View style={styles.container}>
      <AnimatedLottieView
        autoPlay
        ref={animation}
        style={{
          width: "50%",
          alignSelf: "center",
          height: 200,
        }}
        source={require("../assets/animations/shipping.json")}
      />
      <InterBoldText style={styles.title}>Products On Shipping</InterBoldText>
      <Link href={"/(tabs)/"}>
        <View style={styles.emptyLinkContainer}>
          <InterBoldText style={styles.emptyLink}>
            return to Store
          </InterBoldText>
          <FontAwesome name="arrow-right" color={"blue"} />
        </View>
      </Link>
    </View>
  );
};

export default ShippingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  title: {
    fontSize: 24,
  },
  emptyLinkContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  emptyText: {
    fontSize: 22,
  },
  emptyLink: {
    color: "blue",
    textAlign: "center",
    textTransform: "capitalize",
    // textDecorationLine: "underline",
  },
});
