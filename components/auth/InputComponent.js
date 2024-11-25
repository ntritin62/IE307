import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function InputComponent({
  fieldName,
  fieldIcon,
  fieldIconSize,
  fieldValue,
  setFieldValue,
  isSecure,
}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputBox}
        placeholder={fieldName}
        value={fieldValue}
        onChangeText={setFieldValue}
        secureTextEntry={isSecure}
      />
      <Icon name={fieldIcon} size={fieldIconSize} style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 20,
    width: 320,
  },
  inputBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 0.6,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 50,
  },
  icon: {
    position: "absolute",
    top: 11,
    left: 15,
  },
});
