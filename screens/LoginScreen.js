import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import InputComponent from "../components/auth/InputComponent";
import SubmitButton from "../components/auth/SubmitButton";
import Logo from "../components/auth/Logo";
import NavigationInfo from "../components/auth/NavigationInfo";
import colors from "../constants/colors";
import Toast, { SuccessToast, ErrorToast } from "react-native-toast-message";
import Toaster from "../components/ui/Toaster";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AuthContext } from "../services/AuthContext";
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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/auth/login`,
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        Alert.alert("Đăng nhập thành công", "", [
          {
            text: "OK",
            // onPress: () => navigation.navigate("Home"),
          },
        ]);
        // Toast.show({
        //   type: "successToast",
        //   text1: "Đăng nhập thành công!",
        // });
        setEmail("");
        setPassword("");
        await AsyncStorage.setItem("token", response.data.token)
          .then(() => {
            setToken(response.data.token);
            navigation.navigate("Home");
          })
          .catch((error) => {
            Toast.show({
              type: "errorToast",
              text1: "AsyncStorage error: " + error,
            });
          });
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
          name="Đăng nhập vào Lappu Store"
          image={require("../assets/lappu-store-logo.png")}
        />
        <View style={styles.formContainer}>
          <InputComponent
            fieldName="Email"
            fieldIcon="envelope"
            fieldIconSize={25}
            fieldValue={email}
            setFieldValue={setEmail}
          />
          <InputComponent
            fieldName="Password"
            fieldIcon="lock"
            fieldIconSize={30}
            fieldValue={password}
            setFieldValue={setPassword}
            isSecure={true}
          />
          <Pressable>
            <Text style={styles.forgotPassText}>Quên mật khẩu?</Text>
          </Pressable>
          <SubmitButton name="ĐĂNG NHẬP" onTouch={handleLogin} />
        </View>
        <Text style={styles.externalLoginTitle}>Hoặc đăng nhập với</Text>
        <View style={styles.externalLogoList}>
          <Image
            source={require("../assets/facebook_icon.png")}
            style={styles.externalLogo}
          />
          <Image
            source={require("../assets/google_icon.png")}
            style={styles.externalLogo}
          />
        </View>
        <NavigationInfo
          info="Chưa có tài khoản?"
          link="Đăng ký"
          destination="Register"
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
  forgotPassText: {
    textAlign: "right",
    color: colors["primary-600"],
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
  },
  externalLoginTitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 18,
    marginTop: 20,
  },
  externalLogoList: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 20,
  },
  externalLogo: {
    width: 50,
    height: 50,
  },
});
