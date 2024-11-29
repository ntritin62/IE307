import AsyncStorage from "@react-native-async-storage/async-storage";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// Hàm lấy token từ AsyncStorage
const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

// Hàm gọi API: GET
const fetchUserProfile = async () => {
  try {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/api/v1/users/showMe`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Không thể lấy thông tin người dùng.");
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi fetchUserProfile:", error);
    throw error;
  }
};

// Hàm gọi API: Cập nhật thông tin người dùng
const updateUserProfile = async (userData) => {
  try {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/api/v1/users/updateUser`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg || "Không thể cập nhật thông tin.");
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi updateUserProfile:", error);
    throw error;
  }
};

// Hàm gọi API: Đổi mật khẩu
const changeUserPassword = async (oldPassword, newPassword) => {
  try {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/api/v1/users/updateUserPassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.msg || "Không thể đổi mật khẩu.");
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi changeUserPassword:", error);
    throw error;
  }
};
export { fetchUserProfile, updateUserProfile, changeUserPassword };
