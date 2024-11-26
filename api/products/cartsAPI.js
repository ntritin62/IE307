const apiUrl = process.env.EXPO_PUBLIC_API_URL;
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addItemToCart = async (productId) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.post(
      `${apiUrl}/api/v1/cart/addItemToCart`,
      { productId },
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

export const getUserCart = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.get(`${apiUrl}/api/v1/cart/showMyCart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.cart[0];
  } catch (error) {
    throw error;
  }
};

export const deleteItemInCart = async (itemId) => {
  try {
    const token = await AsyncStorage.getItem("token");

    return await axios.delete(`${apiUrl}/api/v1/cart/deleteItemInCart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        itemId,
      },
    });
  } catch (error) {
    throw error;
  }
};
