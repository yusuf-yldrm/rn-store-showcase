import { Pressable, StyleSheet } from "react-native";

import { useState } from "react";
import { InterBoldText } from "../../src/components/StyledText";
import { View } from "../../src/components/Themed";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import {
  incrementAsync,
  selectCount,
} from "../../src/store/slices/counterSlice";
export default function DiscoverScreen() {
  const [incrementAmount, setIncrementAmount] = useState("2");

  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector(selectCount);
  const status = useAppSelector((state) => state.counter.status);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <InterBoldText>{count}</InterBoldText>
      <Pressable
        onPress={() => {
          dispatch(incrementAsync(10));
        }}
      >
        <InterBoldText>{status}</InterBoldText>
      </Pressable>
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
