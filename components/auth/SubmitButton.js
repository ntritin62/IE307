import React from "react";
import { StyleSheet, Text, Pressable } from "react-native";

export default function SubmitButton({ name, onTouch }) {
  return (
    <Pressable style={styles.submitButton} onPress={() => onTouch()}>
      <Text style={styles.buttonText}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: "#28ccc7",
    height: 45,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});
