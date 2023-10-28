import { StyleSheet } from "react-native";

import { InterBoldText } from "../../src/components/StyledText";
import { View } from "../../src/components/Themed";

export default function DiscoverScreen() {
  return (
    <View style={styles.container}>
      <InterBoldText>Test</InterBoldText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
