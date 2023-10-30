import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import AnimatedLottieView from "lottie-react-native";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { InterBoldText } from "../Theme/StyledText";

const EmptyScreen = ({ title = "Cart" }) => {
  const animation = useRef(null);
  return (
    <View style={styles.screen}>
      <View>
        <AnimatedLottieView
          autoPlay
          ref={animation}
          style={{
            width: 200,
            alignSelf: "center",
            height: 200,
          }}
          source={require("../../../assets/animations/empty-cart-bg.json")}
        />
        <AnimatedLottieView
          autoPlay
          ref={animation}
          style={{
            width: 150,
            alignSelf: "center",
            height: 150,
            position: "absolute",
          }}
          source={require("../../../assets/animations/empty-cart.json")}
        />
      </View>
      <View style={styles.emptyTextContainer}>
        <InterBoldText style={styles.emptyText}>
          Your {title} Is Empty
        </InterBoldText>
        <Link href={"/(tabs)/"}>
          <View style={styles.emptyLinkContainer}>
            <InterBoldText style={styles.emptyLink}>
              return to Store
            </InterBoldText>
            <FontAwesome name="arrow-right" color={"blue"} />
          </View>
        </Link>
      </View>
    </View>
  );
};

export default EmptyScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTextContainer: {
    gap: 5,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 22,
  },
  emptyLinkContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  emptyLink: {
    color: "blue",
    textAlign: "center",
    textTransform: "capitalize",
    // textDecorationLine: "underline",
  },
});
