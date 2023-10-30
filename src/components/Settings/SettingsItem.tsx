import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { InterBoldText, InterMediumText } from "../Theme/StyledText";
import { ExternalLink } from "../Utils/ExternalLink";

interface SettingsItemProps {
  title: string;
  value: string;
  link?: string;
}

const SettingsItem = (props: SettingsItemProps) => {
  const { title, value, link } = props;
  return (
    <View style={styles.container}>
      <InterBoldText style={styles.title}>{title}</InterBoldText>
      <View>
        {link ? (
          <ExternalLink href={link}>
            <View style={styles.link}>
              <FontAwesome name="globe" />

              <InterMediumText style={styles.valueText}>
                {value}
              </InterMediumText>
            </View>
          </ExternalLink>
        ) : (
          <InterMediumText style={styles.valueText}>{value}</InterMediumText>
        )}
      </View>
    </View>
  );
};

export default SettingsItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: "gray",
    paddingVertical: 10,
  },
  title: {
    textTransform: "capitalize",
  },
  link: {
    gap: 4,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  valueText: {},
});
