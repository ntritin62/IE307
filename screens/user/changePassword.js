import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { changeUserPassword } from "../../api/accountAPI/accountAPI"; // Import hàm changeUserPassword từ API
import Icon from "react-native-vector-icons/Feather"; // Import icon từ thư viện

export const ChangePasswordScreen = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false); // Trạng thái hiển thị mật khẩu cũ
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false); // Trạng thái hiển thị mật khẩu mới
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false); // Trạng thái hiển thị xác nhận mật khẩu

  const handleChangePassword = async () => {
    // Kiểm tra các trường nhập liệu
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp không
    if (newPassword !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      // Gọi API để đổi mật khẩu
      const response = await changeUserPassword(oldPassword, newPassword);

      if (response) {
        // Nếu thành công, thông báo thành công và quay lại màn hình trước
        Alert.alert("Thành công", "Mật khẩu đã được thay đổi.");
        navigation.goBack();
      }
    } catch (error) {
      // Nếu có lỗi xảy ra trong quá trình gọi API
      console.error("Lỗi khi đổi mật khẩu:", error);
      Alert.alert("Lỗi", error.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Đổi mật khẩu</Text>

        {/* Mật khẩu cũ */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu cũ"
            secureTextEntry={!isOldPasswordVisible}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
          >
            <Icon
              name={isOldPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        {/* Mật khẩu mới */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu mới"
            secureTextEntry={!isNewPasswordVisible}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
          >
            <Icon
              name={isNewPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        {/* Xác nhận mật khẩu mới */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Xác nhận mật khẩu mới"
            secureTextEntry={!isConfirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          >
            <Icon
              name={isConfirmPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleChangePassword}
          >
            <Text style={styles.buttonText}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Đảm bảo nội dung có thể cuộn khi cần
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  icon: {
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 11,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#63c9c6",
    padding: 11,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
