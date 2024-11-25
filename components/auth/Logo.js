import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import colors from "../../constants/colors";

export default function Logo({ name, image }) {
  return (
    <View>
      <View style={styles.appLogo}>
        <Image source={image} style={styles.logo} />
      </View>
      <Text style={styles.logoName}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  appLogo: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 5,
  },
  logoName: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
    color: colors["primary-600"],
  },
});
