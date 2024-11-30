const apiUrl = process.env.EXPO_PUBLIC_API_URL;
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getStripePublishableKey = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.get(`${apiUrl}/api/v1/stripe`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.publishableKey;
  } catch (error) {
    throw error;
  }
};

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

export const createOrderStripe = async (
  paymentIntentId,
  clientSecret,
  addressId
) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.post(
      `${apiUrl}/api/v1/orders/createOrderStripe`,
      {
        paymentIntentId,
        clientSecret,
        addressId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
