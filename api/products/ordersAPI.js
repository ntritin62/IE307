const apiUrl = process.env.EXPO_PUBLIC_API_URL;
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createPaymentIntent = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.post(
      `${apiUrl}/api/v1/orders/createPaymentIntent`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOrderCOD = async (addressId) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.post(
      `${apiUrl}/api/v1/orders/createOrderCOD`,
      { addressId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
