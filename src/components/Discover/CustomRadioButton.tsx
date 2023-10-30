import { StyleSheet, TouchableOpacity } from "react-native";
import { InterBoldText } from "../Theme/StyledText";

export const CustomRadioButton = ({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) => (
  <TouchableOpacity
    style={[
      styles.radioButton,
      { backgroundColor: selected ? "#007BFF" : "#FFF" },
    ]}
    onPress={onSelect}
  >
    <InterBoldText
      style={[styles.radioButtonText, { color: selected ? "#FFF" : "#000" }]}
    >
      {label}
    </InterBoldText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  radioButton: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#007BFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioButtonText: {
    fontSize: 14,
  },
});
