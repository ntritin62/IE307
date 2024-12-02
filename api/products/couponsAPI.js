import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// Hàm lấy tất cả mã giảm giá
export const getAllCoupons = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/coupons`);
    return response.data.coupons; // Trả về danh sách mã giảm giá
  } catch (err) {
    console.error("Lỗi khi lấy danh sách mã giảm giá:", err);
    return [];
  }
};

// Hàm lấy mã giảm giá theo ID
export const getCouponById = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/coupons/${id}`);
    return response.data.coupon; // Trả về thông tin mã giảm giá
  } catch (err) {
    console.error(`Lỗi khi lấy mã giảm giá với ID: ${id}`, err);
    return null;
  }
};

// Hàm tìm kiếm mã giảm giá theo điều kiện
export const searchCoupons = async (keyword) => {
  try {
    const response = await axios.get(`${apiUrl}/api/v1/coupons`);
    return response.data.coupons.filter((coupon) =>
      coupon.code.toLowerCase().includes(keyword.toLowerCase())
    );
  } catch (err) {
    console.error("Lỗi khi tìm kiếm mã giảm giá:", err);
    return [];
  }
};
