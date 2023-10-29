import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import Colors from "../../src/constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerRight: ({}) => {
            return (
              <Link
                style={{
                  borderColor: "white",
                  paddingRight: 10,
                }}
                href="/settings-modal"
              >
                <TabBarIcon name="bars" color="black" />
              </Link>
            );
          },
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="checkout"
        options={{
          title: "Basket",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="cart-arrow-down" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
