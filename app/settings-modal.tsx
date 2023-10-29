import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import SettingsItem from "../src/components/Settings/SettingsItem";
import { View } from "../src/components/Theme/Themed";

export default function ModalScreen() {
  const appVersion = Constants.expoConfig?.version;
  const githubUrl = Constants.expoConfig?.githubUrl;
  return (
    <View style={styles.container}>
      <SettingsItem title="version" value={appVersion?.toString() || "1.0.0"} />
      <SettingsItem title="Github" value="Repository" link={githubUrl || ""} />
      <SettingsItem
        title="Creator"
        value={"Yusuf Yıldırım"}
        link="https://www.linkedin.com/in/yusuf-yldrm/"
      />

      <SettingsItem
        title="Notion for Store"
        value={"Notion"}
        link="https://www.notion.so/React-Native-Showcase-6a80794df2464d1f9877edb6aaf33c8d"
      />

      <SettingsItem
        title="Github Project"
        value={"Project Link"}
        link="https://github.com/users/yusuf-yldrm/projects/3"
      />
      <SettingsItem
        title="Personal Website"
        value={"Website"}
        link="https://yusufyildirim.dev"
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
