import { FontAwesome } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { InterMediumText } from "../Theme/StyledText";

interface SortSelectFieldProps {}

const SortSelectField = (props: SortSelectFieldProps) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  // variables
  const snapPoints = React.useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconArea}>
        <FontAwesome name="sort" />

        <InterMediumText>Sort</InterMediumText>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default SortSelectField;

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  iconArea: {
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 4,
    height: "100%",
  },
});
