import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome";

export default function OrderSuccessScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.successIcon}>
        <Icon name="check" size={60} color="#fff" />
      </View>

      <Text style={styles.orderSuccessText}>Đặt hàng thành công!</Text>

      <View style={styles.buttonList}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Về trang chủ</Text>
          <Icon name="home" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Account")}
        >
          <Text style={styles.buttonText}>Xem đơn hàng</Text>
          <Icon name="inbox" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  successIcon: {
    padding: 20,
    borderRadius: 50,
    backgroundColor: colors["primary-400"],
  },
  orderSuccessText: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors["primary-600"],
    marginTop: 20,
    marginBottom: 10,
  },
  buttonList: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
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
