import AsyncStorage from "@react-native-async-storage/async-storage";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// Hàm lấy token từ AsyncStorage
const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

// Hàm gọi API: GET - Lấy tất cả địa chỉ của người dùng
const fetchUserAddresses = async () => {
  try {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/api/v1/addresses/showMyAddresses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Không thể lấy danh sách địa chỉ.");
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi fetchUserAddresses:", error);
    throw error;
  }
};

// Hàm gọi API: POST - Thêm địa chỉ mới
const addUserAddress = async (addressData) => {
  try {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/api/v1/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addressData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg || "Không thể thêm địa chỉ.");
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi addUserAddress:", error);
    throw error;
  }
};

// Hàm gọi API: PATCH - Cập nhật địa chỉ
const updateUserAddress = async (addressId, addressData) => {
  try {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/api/v1/addresses/${addressId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addressData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg || "Không thể cập nhật địa chỉ.");
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi updateUserAddress:", error);
    throw error;
  }
};

// Hàm gọi API: DELETE - Xóa địa chỉ
const deleteUserAddress = async (addressId) => {
  try {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/api/v1/addresses/${addressId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg || "Không thể xóa địa chỉ.");
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi deleteUserAddress:", error);
    throw error;
  }
};

export {
  fetchUserAddresses,
  addUserAddress,
  updateUserAddress,
  deleteUserAddress,
};
