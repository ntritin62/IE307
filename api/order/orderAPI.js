// import axios from "axios";
// const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// // Hàm lấy danh sách tất cả đơn hàng
// export const getAllOrders = async () => {
//   try {
//     const response = await axios.get(apiUrl, {
//       headers: {
//         "Content-Type": "application/json", // Bỏ qua Authorization
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Lỗi khi lấy danh sách đơn hàng:", error);
//     throw error;
//   }
// };

// // Hàm lấy đơn hàng của người dùng hiện tại
// export const getCurrentUserOrders = async () => {
//   try {
//     const response = await axios.get(
//       `${apiUrl}/api/v1/orders/showAllMyOrders`,
//       {
//         headers: {
//           "Content-Type": "application/json", // Bỏ qua Authorization
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Lỗi khi lấy đơn hàng của người dùng:", error);
//     throw error;
//   }
// };

// // Hàm lấy thông tin chi tiết đơn hàng theo id
// export const getOrder = async (orderId) => {
//   try {
//     const response = await axios.get(`${apiUrl}/${orderId}`, {
//       headers: {
//         "Content-Type": "application/json", // Bỏ qua Authorization
//       },
//     });
//     return response.data; // Trả về thông tin đơn hàng
//   } catch (error) {
//     console.error("Lỗi khi lấy thông tin đơn hàng:", error);
//     throw error;
//   }
// };

import axios from "axios";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// Lấy danh sách tất cả đơn hàng của người dùng hiện tại
export const getCurrentUserOrders = async (token) => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/v1/orders/showAllMyOrders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.orders;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Không thể lấy danh sách đơn hàng."
    );
  }
};
