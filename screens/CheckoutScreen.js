import React, { useMemo, useState, useEffect } from "react";
import RadioGroup from "react-native-radio-buttons-group";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../constants/colors";
import format from "../services/formatVND";
import ghtkImg from "../assets/GHTK.png";
import { useStripe } from "@stripe/stripe-react-native";
import SectionHeader from "../components/cart/SectionHeader";
import { getUserCart } from "../api/products/cartsAPI";
import LoadingScreen from "./LoadingScreen";
import {
  createOrderCOD,
  createOrderStripe,
  createPaymentIntent,
} from "../api/products/ordersAPI";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast, { ErrorToast } from "react-native-toast-message";
import Toaster from "../components/ui/Toaster";

const toastConfig = {
  error: (props) => (
    <ErrorToast
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
  errorToast: ({ text1, props }) => <Toaster title={text1} type="error" />,
};

export default function CheckoutScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const navigation = useNavigation();
  const route = useRoute();
  const selectedAddressId = route.params?.selectedAddressId || null;
  const [address, setAddress] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartLoading, setCartLoading] = useState(true);
  const [paymentSheetLoading, setPaymentSheetLoading] = useState(false);
  const [paymentClientSecret, setPaymentClientSecret] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const getAddressById = async (addressId) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(
        `${apiUrl}/api/v1/addresses/${addressId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.address;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAddress = async (addressId) => {
    try {
      const storedAddress = await getAddressById(addressId);
      setAddress(storedAddress);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartTotal = async () => {
    try {
      const storedCart = await getUserCart();
      setCartTotal(storedCart.subtotal);
    } catch (error) {
      console.log(error);
    } finally {
      setCartLoading(false);
    }
  };

  const initializePaymentSheet = async () => {
    const { clientSecret } = await createPaymentIntent();
    setPaymentClientSecret(clientSecret);

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      paymentIntentClientSecret: clientSecret,
    });

    if (error) {
      console.log("Failed to initialize payment sheet", error.message);
    } else {
      console.log("Payment sheet initialized");
      setPaymentSheetLoading(true);
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      initializePaymentSheet();
      setIsInitialized(true);
    }

    fetchCartTotal();
    fetchAddress(selectedAddressId);
  }, [selectedAddressId, address]);

  const openPaymentSheet = async () => {
    if (!selectedAddressId) {
      Toast.show({
        type: "errorToast",
        text1: "Vui lòng cung cấp địa chỉ",
      });
      return;
    }

    const { error } = await presentPaymentSheet();

    if (error) {
      Toast.show({
        type: "errorToast",
        text1: "Thanh toán thất bại: " + error.message,
      });
    } else {
      const paymentIntentId = paymentClientSecret.substring(0, 27);

      try {
        await createOrderStripe(
          paymentIntentId,
          paymentClientSecret,
          selectedAddressId
        );
        navigation.navigate("OrderSuccess");
      } catch (err) {
        Toast.show({
          type: "errorToast",
          text1: err.response.data.msg,
        });
      }
    }
  };

  const onCreateOrderCODHandler = async () => {
    if (!selectedAddressId) {
      Toast.show({
        type: "errorToast",
        text1: "Vui lòng cung cấp địa chỉ",
      });
      return;
    }

    try {
      await createOrderCOD(selectedAddressId);
      navigation.navigate("OrderSuccess");
    } catch (error) {
      Toast.show({
        type: "errorToast",
        text1: error.response.data.msg,
      });
    }
  };

  const paymentMethodRadioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Thanh toán khi nhận hàng (COD)",
        value: "cod",
      },
      {
        id: "2",
        label: "Thanh toán bằng thẻ tín dụng",
        value: "card",
      },
    ],
    []
  );

  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState("1");

  if (cartLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <SectionHeader
              title="1. Địa chỉ giao hàng"
              editLinkEnabled={true}
              handlePress={() =>
                navigation.navigate("AddressCheckout", { selectedAddressId })
              }
            />

            {address ? (
              <View style={styles.textContainer}>
                <Text style={styles.customerName}>{address.recipientName}</Text>
                <Text style={styles.customerAddress}>
                  {address.deliveryAddress}
                </Text>
                <Text style={styles.customerPhoneNumber}>
                  {address.contactNumber}
                </Text>
              </View>
            ) : null}
          </View>

          <View style={styles.section}>
            <SectionHeader
              title="2. Phương thức vận chuyển"
              editLinkEnabled={true}
            />

            <View style={styles.shippingContainer}>
              <Image source={ghtkImg} style={styles.shippingImage} />
              <View style={styles.textContainer}>
                <Text style={styles.shippingName}>Giao hàng tiết kiệm</Text>
                <Text style={styles.shippingPrice}>Miễn phí</Text>
                <Text style={styles.shippingInfo}>
                  Nhận hàng vào 16/11 - 18/11
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <SectionHeader
              title="3. Phương thức thanh toán"
              editLinkEnabled={false}
            />

            <RadioGroup
              radioButtons={paymentMethodRadioButtons}
              onPress={setSelectedPaymentMethodId}
              selectedId={selectedPaymentMethodId}
              layout="column"
              containerStyle={{ alignItems: "flex-start" }}
            />
          </View>

          <View style={styles.couponSection}>
            <Text style={styles.couponHeader}>Áp dụng mã giảm giá</Text>
            <TouchableOpacity style={styles.couponLink}>
              <Text style={styles.couponLinkText}>Áp dụng</Text>
              <Icon name="film" size={15} color={colors["primary-700"]} />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>Tổng thanh toán</Text>
            <Text style={styles.totalPrice}>{format(cartTotal)}</Text>
          </View>

          {selectedPaymentMethodId == 2 ? (
            <TouchableOpacity
              style={styles.button}
              disabled={!paymentSheetLoading}
              onPress={openPaymentSheet}
            >
              <Text style={styles.buttonText}>Thanh toán</Text>
              <Icon name="credit-card-alt" size={15} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={onCreateOrderCODHandler}
            >
              <Text style={styles.buttonText}>Đặt hàng</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Toast config={toastConfig} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  section: {
    gap: 5,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: "column",
    marginHorizontal: 20,
  },
  customerName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  customerAddress: {
    fontSize: 14,
  },
  customerPhoneNumber: {
    fontSize: 14,
  },
  shippingName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  shippingPrice: {
    fontSize: 14,
    color: colors["primary-800"],
    fontWeight: "500",
  },
  shippingInfo: {
    fontSize: 14,
  },
  shippingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  shippingImage: {
    width: "20%",
    height: 50,
    resizeMode: "contain",
  },
  couponSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
  },
  couponHeader: {
    color: "#000",
    marginLeft: 5,
  },
  couponLink: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  couponLinkText: {
    color: colors["primary-700"],
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
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28ccc7",
    padding: 12,
    borderRadius: 20,
    marginVertical: 15,
    marginHorizontal: 10,
    columnGap: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
