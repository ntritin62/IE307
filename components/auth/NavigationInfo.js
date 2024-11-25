import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import colors from "../../constants/colors";

export default function NavigationInfo({
  info,
  link,
  destination,
  navigation,
}) {
  return (
    <View style={styles.navigationInfo}>
      <Text style={styles.info}>{info}</Text>
      <Pressable onPress={() => navigation.navigate(destination)}>
        <Text style={styles.link}>{link}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navigationInfo: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 5,
    marginTop: 20,
  },
  info: {
    textAlign: "center",
    fontSize: 18,
  },
  link: {
    fontSize: 18,
    color: colors["primary-600"],
    fontWeight: "bold",
  },
});
