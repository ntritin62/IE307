import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Badge = ({ count }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: -10,
    top: -5,
    backgroundColor: "red",
    borderRadius: 11,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default Badge;
