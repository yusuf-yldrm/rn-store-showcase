import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { InterMediumText } from "../Theme/StyledText";

export const CustomRadioButton = ({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) => (
  <TouchableOpacity style={[styles.radioButton]} onPress={onSelect}>
    <InterMediumText
      style={[styles.radioButtonText, { fontWeight: selected ? "800" : "500" }]}
    >
      {label}
    </InterMediumText>
    <FontAwesome name={selected ? "circle" : "circle-o"} />
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
    borderBottomWidth: 1,
    width: "100%",
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioButtonText: {
    fontSize: 14,
  },
});
