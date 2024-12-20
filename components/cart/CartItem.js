import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import colors from "../../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import format from "../../services/formatVND";

const CartItem = ({ item, onItemPress, onDelete }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onItemPress}>
      <View style={styles.itemInfo}>
        <Image
          source={{
            uri: item.imageUrl,
          }}
          style={styles.itemImage}
        />
        <View style={styles.itemText}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.currentItemPrice}>
            {format(item.price - item.price * (item.saleOff / 100))}
          </Text>
          {item.saleOff > 0 ? (
            <Text style={styles.oldItemPrice}>{format(item.price)}</Text>
          ) : null}
        </View>
      </View>

      <TouchableOpacity style={styles.deleteIcon} onPress={onDelete}>
        <Icon name="trash" size={20} color="#000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    columnGap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 5,
    width: "90%",
    height: 130,
  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  itemText: {
    maxWidth: "55%",
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  currentItemPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors["primary-700"],
  },
  oldItemPrice: {
    fontSize: 14,
    color: "#888",
    textDecorationLine: "line-through",
  },
});

export default CartItem;
