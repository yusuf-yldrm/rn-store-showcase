import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import FilterButton from "../../src/components/Discover/FilterButton";
import ProductEmptyScreen from "../../src/components/Discover/ProductEmptyScreen";
import SortSelectField from "../../src/components/Discover/SortSelectField";
import { ProductCard } from "../../src/components/ProductCard";
import {
  InterBoldText,
  InterMediumText,
} from "../../src/components/Theme/StyledText";
import { View } from "../../src/components/Theme/Themed";
import jsStore from "../../src/services/network";
import { ProductItem } from "../../src/types/Product";
import { SortType } from "../../src/types/Sort";
import { compareProducts } from "../../src/utils/compareProducts";

export default function DiscoverScreen() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalProduct, setTotalProduct] = useState(0);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortType | null>(SortType.DISCOUNT);
  const [category, setCategory] = useState("");

  const getProducts = async () => {
    if (query.length == 0) {
      try {
        setLoading(true);
        const [data, err] = await jsStore.product.getAllProducts();
        if (err != null) {
          throw err;
        }
        setTotalProduct(data.total);
        setProducts(data.products);
        setLoading(false);
      } catch (err: any) {
        console.error({
          title: "Discover > Get Products",
          err,
        });
      }
    }
  };

  const searchProductsByQuery = async () => {
    try {
      setLoading(true);
      setProducts([]);
      const [data, err] = await jsStore.product.searchProducts({
        q: query,
      });

      if (err != null) {
        throw err;
      }
      setTotalProduct(data.total);
      setProducts(data.products);
      setLoading(false);
    } catch (err: any) {
      console.error({
        title: "Discover > Get Products",
        err,
      });
    }
  };

  const searchProductsByCategory = async () => {
    try {
      if (category == "") {
        return;
      }
      setLoading(true);
      setProducts([]);

      const [data, err] = await jsStore.product.getProductsByCategory({
        category: query,
      });

      if (err != null) {
        throw err;
      }
      setTotalProduct(data.total);
      setProducts(data.products);
      setLoading(false);
    } catch (err: any) {
      console.error({
        title: "Discover > Get Products",
        err,
      });
    }
  };

  const sortProducts = async () => {
    if (sort != null) {
      const filteredProducts = products;
      products.sort((a, b) => compareProducts(a, b, sort));
    }
  };

  useEffect(() => {
    getProducts();
  }, [query]);

  useEffect(() => {
    if (query.length > 0) {
      searchProductsByQuery();
    }
  }, [query]);

  useEffect(() => {
    sortProducts();
  }, [sort]);

  useEffect(() => {
    searchProductsByCategory();
  }, [category]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.productInfoContainer}>
          <InterBoldText>Ürünler</InterBoldText>
          <InterBoldText>(Toplam {totalProduct} adet)</InterBoldText>
        </View>

        <View style={styles.filterContainer}>
          <TextInput
            style={styles.searchInput}
            value={query}
            placeholder="Search a product"
            onChangeText={setQuery}
          />
          <View style={styles.iconArea}>
            <FontAwesome name="filter" />
            <InterMediumText>Filter</InterMediumText>
          </View>
          <FilterButton category={category} setCategory={setCategory} />
          <SortSelectField setSort={setSort} sort={sort} />
        </View>

        {loading ? (
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={products}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            renderItem={({ item, index }) => (
              <ProductCard key={item.id} product={item} />
            )}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={() => (
              <ProductEmptyScreen
                onPress={() => {
                  setQuery("");
                }}
              />
            )}
            style={styles.productList}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 9,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  searchInput: {
    borderWidth: 1,
    height: 30,
    width: "65%",
    paddingHorizontal: 5,
    borderColor: "gray",
    borderRadius: 10,
  },
  productList: {
    width: "100%",
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
  productInfoContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  filterContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
