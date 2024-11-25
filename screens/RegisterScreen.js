import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import InputComponent from "../components/auth/InputComponent";
import SubmitButton from "../components/auth/SubmitButton";
import Logo from "../components/auth/Logo";
import NavigationInfo from "../components/auth/NavigationInfo";
import Toast, { SuccessToast, ErrorToast } from "react-native-toast-message";
import Toaster from "../components/ui/Toaster";
import axios from "axios";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const toastConfig = {
  success: (props) => (
    <SuccessToast
      {...props}
      text1Style={{
        fontSize: 25,
        fontWeight: "700",
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
  successToast: ({ text1, props }) => <Toaster title={text1} type="success" />,
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 25,
        fontWeight: "700",
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
  errorToast: ({ text1, props }) => <Toaster title={text1} type="error" />,
};

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!email.trim()) {
      Toast.show({
        type: "errorToast",
        text1: "Email không được để trống",
      });
      return;
    }
    if (!password.trim()) {
      Toast.show({
        type: "errorToast",
        text1: "Mật khẩu không được để trống",
      });
      return;
    }
    if (confirmPassword !== password) {
      Toast.show({
        type: "errorToast",
        text1: "Mật khẩu xác nhận không khớp",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/auth/register`,
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        Alert.alert("Đăng ký thành công", "Bạn đã tạo tài khoản thành công!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
        // Toast.show({
        //   type: "successToast",
        //   text1: "Bạn đã tạo tài khoản thành công!",
        // });
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        Toast.show({
          type: "errorToast",
          text1: "Đã xảy ra lỗi " + response.status,
        });
      }
    } catch (error) {
      Toast.show({
        type: "errorToast",
        text1: error.response.data.msg,
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Logo
          name="Tạo tài khoản mới"
          image={require("../assets/lappu-store-logo.png")}
        />
        <View style={styles.formContainer}>
          <InputComponent
            fieldName="Nhập email"
            fieldIcon="envelope"
            fieldIconSize={25}
            fieldValue={email}
            setFieldValue={setEmail}
          />
          <InputComponent
            fieldName="Nhập password"
            fieldIcon="lock"
            fieldIconSize={30}
            fieldValue={password}
            setFieldValue={setPassword}
            isSecure={true}
          />
          <InputComponent
            fieldName="Xác nhận password"
            fieldIcon="lock"
            fieldIconSize={30}
            fieldValue={confirmPassword}
            setFieldValue={setConfirmPassword}
            isSecure={true}
          />
          <SubmitButton name="ĐĂNG KÝ" onTouch={handleRegister} />
        </View>
        <NavigationInfo
          info="Đã có tài khoản?"
          link="Đăng nhập"
          destination="Login"
          navigation={navigation}
        />
      </View>
      <Toast config={toastConfig} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    marginLeft: 35,
    marginRight: 35,
  },
});
