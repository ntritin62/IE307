const apiUrl = process.env.EXPO_PUBLIC_API_URL;
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const addItemToCart = async (productId) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await axios.post(
      `${apiUrl}/api/v1/cart/addItemToCart`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
