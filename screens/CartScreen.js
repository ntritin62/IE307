import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import colors from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import format from "../services/formatVND";
import CartItem from "../components/cart/CartItem";
import { getUserCart, deleteItemInCart } from "../api/products/cartsAPI";
import LoadingScreen from "./LoadingScreen";
import Toast, { SuccessToast } from "react-native-toast-message";
import Toaster from "../components/ui/Toaster";
import emptyCartImg from "../assets/empty_cart.png";

const toastConfig = {
  success: (props) => (
    <SuccessToast
      {...props}
      text1Style={{
        fontSize: 25,
        fontWeight: "700",
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
  successToast: ({ text1, props }) => <Toaster title={text1} type="success" />,
};

export default function CartScreen() {
  const navigation = useNavigation();
  const [cart, setCart] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);
  const isFocused = useIsFocused();

  const fetchCart = async () => {
    try {
      const storedCart = await getUserCart();
      setCart(storedCart);
    } catch (error) {
      console.log(error);
    } finally {
      setCartLoading(false);
    }
  };

  const confirmDelete = (itemId, itemName) => {
    Alert.alert(
      "Xác nhận xóa",
      `Bạn có chắc muốn xóa sản phẩm ${itemName} khỏi giỏ hàng?`,
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: () => handleDelete(itemId),
          style: "destructive",
        },
      ]
    );
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await deleteItemInCart(itemId);

      if (response && response.status === 200) {
        Toast.show({
          type: "successToast",
          text1: "Xóa khỏi giỏ hàng thành công",
        });
        fetchCart();
      } else {
        console.log("Đã xảy ra lỗi");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchCart();
    }
  }, [isFocused]);

  if (cartLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      {cart.cartItems.length > 0 ? (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerInfo}>
              Bạn có {cart.cartItems.length} sản phẩm trong giỏ hàng
            </Text>
          </View>

          <ScrollView>
            <View style={styles.itemListContainer}>
              {cart.cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onItemPress={() =>
                    navigation.navigate("ProductDetails", {
                      productId: item.product,
                    })
                  }
                  onDelete={() => confirmDelete(item.product, item.name)}
                />
              ))}
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPriceText}>Tổng tiền</Text>
              <Text style={styles.totalPrice}>{format(cart.subtotal)}</Text>
            </View>

            <View style={styles.buttonList}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Home")}
              >
                <Icon name="arrow-left" size={15} color="#fff" />
                <Text style={styles.buttonText}>Tiếp tục mua sắm</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Checkout")}
              >
                <Text style={styles.buttonText}>Tiến hành thanh toán</Text>
                <Icon name="arrow-right" size={15} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Image source={emptyCartImg} style={styles.emptyCartImage} />
          <Text style={styles.emptyCartTitle}>Giỏ hàng trống!</Text>
          <Text style={styles.emptyCartSideInfo}>
            Có vẻ như bạn chưa thêm gì vào giỏ hàng
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.buttonText}>Bắt đầu mua sắm</Text>
            <Icon name="cart-plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      <Toast config={toastConfig} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: 25,
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
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyCartImage: {
    width: 230,
    height: 230,
    resizeMode: "contain",
  },
  emptyCartTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors["primary-600"],
    marginBottom: 5,
  },
  emptyCartSideInfo: {
    fontSize: 16,
    color: "#000",
    marginVertical: 10,
  },
});
