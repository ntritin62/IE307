import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { updateUserAddress } from "../../api/accountAPI/editAddressAPI";

export const EditAddressScreen = ({ route, navigation }) => {
  const { address, recipient, phone, addressId, updateUserAddressFunction } =
    route.params; // Nhận các tham số từ route

  const [form, setForm] = useState({
    recipient: recipient, // Tên người nhận
    address: address, // Địa chỉ
    phone: phone, // Số điện thoại
  });

  // Handle lưu lại thay đổi
  const handleSave = async () => {
    if (!form.recipient || !form.phone || !form.address) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    try {
      // Call the API to update the address
      const updatedAddress = await updateUserAddress(addressId, {
        recipientName: form.recipient,
        deliveryAddress: form.address,
        contactNumber: form.phone,
      });

      if (updatedAddress) {
        // After saving successfully, call the callback to update the address on the profile screen
        updateUserAddressFunction({
          ...address,
          _id: addressId,
          recipientName: form.recipient,
          deliveryAddress: form.address,
          contactNumber: form.phone,
        });

        Alert.alert("Thành công", "Địa chỉ đã được cập nhật.");
        navigation.goBack(); // Go back to the previous screen
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật địa chỉ:", error);
      Alert.alert("Lỗi", "Không thể cập nhật địa chỉ.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Chỉnh sửa địa chỉ</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên người nhận"
        value={form.recipient}
        onChangeText={(text) => setForm({ ...form, recipient: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ"
        value={form.address}
        onChangeText={(text) => setForm({ ...form, address: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={form.phone}
        keyboardType="phone-pad"
        onChangeText={(text) => setForm({ ...form, phone: text })}
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: -250,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ccc",
    padding: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#63c9c6",
    padding: 11,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});
