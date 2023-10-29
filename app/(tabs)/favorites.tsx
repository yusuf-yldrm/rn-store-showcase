import { StyleSheet } from "react-native";

import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { FavoriteCard } from "../../src/components/FavoriteCard";
import { View } from "../../src/components/Theme/Themed";
import { useAppSelector } from "../../src/store/hooks";
import { ProductItem } from "../../src/types/Product";

export default function FavoritesScreen() {
  const favoriteItems = useAppSelector((items) => items.favorite.favorite);
  const [favorites, setFavorites] = useState<ProductItem[]>([]);

  useEffect(() => {
    setFavorites(favoriteItems);
  }, [favoriteItems]);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 15,
        }}
        ItemSeparatorComponent={() => (
          <View style={{ width: 10, height: 20 }} />
        )}
        style={styles.favoriteList}
        renderItem={({ item, index }) => {
          return <FavoriteCard product={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteList: {
    paddingTop: 20,
    width: "100%",
    paddingHorizontal: 10,
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
