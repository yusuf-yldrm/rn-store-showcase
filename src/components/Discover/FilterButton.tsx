import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import jsStore from "../../services/network";
import { InterBoldText, InterMediumText } from "../Theme/StyledText";
import { CustomRadioButton } from "./CustomRadioButton";

interface FilterButtonProps {
  setCategory: (category: string) => void;
  category: string | null;
}

const FilterButton = (props: FilterButtonProps) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);

      const [data, err] = await jsStore.product.getProductCategories({
        category: "",
      });

      if (err != null) {
        throw err;
      }
      setCategories(data);
      setLoading(false);
    } catch (err: any) {
      console.error({
        title: "Discover > Get Products",
        err,
      });
    }
  };

  React.useEffect(() => {
    getCategories();
  }, [modalVisible]);

  return (
    <>
      <Pressable
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        style={styles.iconArea}
      >
        <FontAwesome name="sort" />
        <InterMediumText>Sort</InterMediumText>
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView style={{ height: 300 }}>
              {categories.map((item) => (
                <CustomRadioButton
                  label={item}
                  onSelect={() => {
                    props.setCategory(item);
                  }}
                  selected={item == props.category}
                />
              ))}
            </ScrollView>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <InterBoldText style={styles.textStyle}>
                <FontAwesome name="close" />
              </InterBoldText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  container: {},

  iconArea: {
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 4,
    height: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "70%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 10,
    gap: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: "absolute",
    top: 6,
    right: 6,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
