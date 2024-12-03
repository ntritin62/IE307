import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { updateUserProfile } from "../../api/accountAPI/accountAPI";
import { deleteUserAddress } from "../../api/accountAPI/editAddressAPI";

export const EditProfileScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [form, setForm] = useState({
    fullName: user.fullName || user._id,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: user.address,
    avatar: user.avatar || null,
  });

  const handleSave = async () => {
    // console.log("Dữ liệu trước khi gửi lên API:", form);
    try {
      // Cập nhật dữ liệu người dùng trên server
      const updatedUser = await updateUserProfile(form);

      // Nếu dữ liệu được cập nhật thành công, cập nhật lại state
      // console.log("Dữ liệu đã được cập nhật từ API:", updatedUser);
      setForm({ ...form, ...updatedUser }); // Cập nhật lại form với dữ liệu mới trả về từ API

      Alert.alert("Thành công", "Thông tin đã được cập nhật.");
      navigation.goBack(); // Quay lại trang trước
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật thông tin.");
      console.error("Lỗi khi cập nhật thông tin:", error);
    }
  };

  const handleChangePhoto = async () => {
    const options = {
      mediaType: "photo",
      quality: 0.8,
      selectionLimit: 1,
    };
    try {
      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        console.log("Người dùng đã hủy chọn ảnh.");
      } else if (result.errorMessage) {
        console.error("Lỗi khi chọn ảnh:", result.errorMessage);
        Alert.alert("Lỗi", "Không thể chọn ảnh. Vui lòng thử lại.");
      } else {
        const selectedImage = result.assets[0];
        console.log("Ảnh được chọn:", selectedImage);
        setForm({ ...form, avatar: selectedImage.uri });
      }
    } catch (error) {
      console.error("Lỗi khi truy cập thư viện ảnh:", error);
      Alert.alert("Lỗi", "Không thể truy cập thư viện ảnh. Vui lòng thử lại.");
    }
  };

  const navigateToEditAddress = () => {
    navigation.navigate("EditAddressScreen", {
      address: form.address,
      phone: form.phoneNumber,
      recipient: form.fullName,
    });
  };

  const AddressSection = () => (
    <View style={styles.listContent}>
      <View style={styles.addressHeader}>
        <Text style={styles.subtitle}>Địa chỉ</Text>
        <TouchableOpacity
          style={styles.addAddressButton}
          onPress={() => navigation.navigate("AddAddressScreen")}
        >
          <Icon name="add-circle-outline" size={20} color="#fff" />
          <Text style={styles.addAddressButtonText}>Thêm địa chỉ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={handleChangePhoto}
          style={styles.avatarWrapper}
        >
          <Image
            source={
              form.avatar
                ? { uri: form.avatar }
                : require("../../assets/images/avatar.png")
            }
            style={styles.avatar}
          />
          <View style={styles.iconWrapper}>
            <Icon name="camera" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Họ tên"
          value={form.fullName}
          onChangeText={(text) => setForm({ ...form, fullName: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={form.phoneNumber}
          onChangeText={(text) => setForm({ ...form, phoneNumber: text })}
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

        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={() => navigation.navigate("ChangePasswordScreen")}
        >
          <Text style={styles.changePasswordText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        {/* <AddressSection /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  iconWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#63c9c6",
    borderRadius: 50,
    padding: 3,
    right: 15,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    marginBottom: 15,
  },
  changePasswordButton: {
    backgroundColor: "#63c9c6",
    padding: 11,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 10,
    width: "100%",
  },
  changePasswordText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
  },
  listContent: {
    width: "100%",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addressContainer: {
    width: "100%",
  },
  inputWithIcon: {
    position: "relative",
    width: "100%",
  },
  textInputWithIcon: {
    width: "100%",
    paddingVertical: 10,
    paddingRight: 40, // Để chừa không gian cho icon
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  iconInInput: {
    position: "absolute",
    left: 300,
    top: "30%",
    transform: [{ translateY: -10 }], // Căn chỉnh icon giữa theo chiều dọc
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  addAddressButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#63c9c6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  addAddressButtonText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "bold",
  },
  iconsRow: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: "15%",
  },
  iconInInput: {
    marginHorizontal: 10,
    left: 20,
  },
});
