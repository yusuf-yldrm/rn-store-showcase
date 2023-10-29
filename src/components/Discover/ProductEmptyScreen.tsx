import { FontAwesome } from "@expo/vector-icons";
import AnimatedLottieView from "lottie-react-native";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { InterBoldText } from "../Theme/StyledText";

interface ProductEmptyScreenProps {
  onPress: () => void;
}

const ProductEmptyScreen = (props: ProductEmptyScreenProps) => {
  const animation = React.useRef(null);

  return (
    <View style={styles.container}>
      <AnimatedLottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          alignSelf: "center",
          height: 200,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../../assets/animations/empty-loading.json")}
      />

      <View style={styles.emptyContainer}>
        <Text>We cannot find your product.</Text>
        <Pressable
          onPress={() => {
            props.onPress();
          }}
        >
          <View style={styles.emptyLinkContainer}>
            <InterBoldText style={styles.emptyLink}>
              <Text>Try Again?</Text>
            </InterBoldText>
            <FontAwesome name="refresh" color={"blue"} size={20} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default ProductEmptyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  emptyContainer: {
    gap: 10,
  },
  emptyLinkContainer: {
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  emptyLink: {
    color: "blue",
    textAlign: "center",
    textTransform: "capitalize",
    // textDecorationLine: "underline",
  },
});
