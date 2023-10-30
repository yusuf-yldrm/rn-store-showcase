import { FontAwesome } from "@expo/vector-icons";
import * as React from "react";
import { Alert, Modal, Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SortType } from "../../types/Sort";
import { InterBoldText, InterMediumText } from "../Theme/StyledText";
import { CustomRadioButton } from "./CustomRadioButton";

interface SortSelectFieldProps {
  setSort: (sort: SortType) => void;
  sort: SortType | null;
}

const SortSelectField = (props: SortSelectFieldProps) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const sortOptions = [
    {
      title: "Price (DESC)",
      value: SortType.PRICE_DESC,
    },
    {
      title: "Price (ASC)",
      value: SortType.PRICE_ASC,
    },
    {
      title: "Discount (%)",
      value: SortType.DISCOUNT,
    },
  ];

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
            <ScrollView style={{ height: 150, width: "100%", marginTop: 25 }}>
              {sortOptions.map((item) => (
                <CustomRadioButton
                  label={item.title}
                  onSelect={() => {
                    props.setSort(item.value);
                  }}
                  selected={item.value == props.sort}
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

export default SortSelectField;

const styles = StyleSheet.create({
  container: {},

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "85%",
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
