import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import colors from "../constants/colors";

export default function NonAccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.nonAccountSection}>
          <Text style={styles.heading}>
            Hãy đăng nhập để có thể mua sắm laptop và nhận nhiều ưu đãi khác!
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.buttonText}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  mainContent: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  nonAccountSection: {
    flex: 2,
    padding: 20,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    color: colors["primary-600"],
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#63c9c6",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
