import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { addUserAddress } from "../../api/accountAPI/editAddressAPI";

export const AddAddressScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    recipientName: "",
    contactNumber: "",
    deliveryAddress: "",
  });

  const handleSave = async () => {
    console.log("Dữ liệu trước khi gửi lên API:", form);
    // Kiểm tra nếu các trường nhập liệu không trống
    if (!form.recipientName || !form.deliveryAddress || !form.contactNumber) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      const newAddress = await addUserAddress(form); // Gọi API để thêm địa chỉ
      console.log("Dữ liệu đã được cập nhật từ API:", newAddress);
      Alert.alert("Thành công", "Địa chỉ đã được thêm.");
      navigation.goBack(); // Quay lại màn hình trước sau khi thêm địa chỉ
    } catch (error) {
      console.error("Lỗi khi thêm địa chỉ:", error);
      Alert.alert("Lỗi", "Không thể thêm địa chỉ. Vui lòng thử lại.");
    }
  };

  return (
    <View style={styles.addAddressContainer}>
      <Text style={styles.subtitle}>Thêm địa chỉ mới</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên người nhận"
        value={form.recipientName}
        onChangeText={(text) => setForm({ ...form, recipientName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={form.contactNumber}
        keyboardType="phone-pad"
        onChangeText={(text) => setForm({ ...form, contactNumber: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ"
        value={form.deliveryAddress}
        onChangeText={(text) => setForm({ ...form, deliveryAddress: text })}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addAddressContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#63c9c6",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
