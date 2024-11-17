import React from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import format from "../services/formatVND";
import CartItem from "../components/cart/CartItem";

const itemList = [
  {
    id: 1,
    name: "Lenovo IdeaPad Slim 5 16IMH9 83DC001RVN",
    price: "20990000",
    imageUrl:
      "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2023_7_3_638239973445917567_lenovo-ideapad-slim-5-16iah8-xam-dd.jpg",
  },
  {
    id: 2,
    name: "Lenovo IdeaPad Slim 5 16IMH9 83DC001RVN",
    price: "20990000",
    imageUrl:
      "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2023_7_3_638239973445917567_lenovo-ideapad-slim-5-16iah8-xam-dd.jpg",
  },
  {
    id: 3,
    name: "Lenovo IdeaPad Slim 5 16IMH9 83DC001RVN",
    price: "20990000",
    imageUrl:
      "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2023_7_3_638239973445917567_lenovo-ideapad-slim-5-16iah8-xam-dd.jpg",
  },
  {
    id: 4,
    name: "Lenovo IdeaPad Slim 5 16IMH9 83DC001RVN",
    price: "20990000",
    imageUrl:
      "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2023_7_3_638239973445917567_lenovo-ideapad-slim-5-16iah8-xam-dd.jpg",
  },
  {
    id: 5,
    name: "Lenovo IdeaPad Slim 5 16IMH9 83DC001RVN",
    price: "20990000",
    imageUrl:
      "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2023_7_3_638239973445917567_lenovo-ideapad-slim-5-16iah8-xam-dd.jpg",
  },
  {
    id: 6,
    name: "Lenovo IdeaPad Slim 5 16IMH9 83DC001RVN",
    price: "20990000",
    imageUrl:
      "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2023_7_3_638239973445917567_lenovo-ideapad-slim-5-16iah8-xam-dd.jpg",
  },
  {
    id: 7,
    name: "Lenovo IdeaPad Slim 5 16IMH9 83DC001RVN",
    price: "20990000",
    imageUrl:
      "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2023_7_3_638239973445917567_lenovo-ideapad-slim-5-16iah8-xam-dd.jpg",
  },
];

export default function CartScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerInfo}>Bạn có 7 sản phẩm trong giỏ hàng</Text>
      </View>

      <ScrollView>
        <View style={styles.itemListContainer}>
          {itemList.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>Tổng tiền</Text>
          <Text style={styles.totalPrice}>{format(20990000 * 7)}</Text>
        </View>

        <View style={styles.buttonList}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <Icon name="arrow-left" size={15} color="#fff" />
            <Text style={styles.buttonText}>Tiếp tục mua sắm</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Checkout")}
          >
            <Text style={styles.buttonText}>Tiến hành thanh toán</Text>
            <Icon name="arrow-right" size={15} color="#fff" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  headerContainer: {
    padding: 10,
    backgroundColor: colors["primary-400"],
  },
  headerInfo: {
    color: "#000",
  },
  itemListContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
    marginTop: 18,
  },
  footer: {
    paddingTop: 15,
    backgroundColor: "#fff",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 25,
  },
  totalPriceText: {
    marginRight: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors["primary-700"],
  },
  buttonList: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#28ccc7",
    padding: 12,
    borderRadius: 20,
    marginVertical: 15,
    marginHorizontal: 5,
    columnGap: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
