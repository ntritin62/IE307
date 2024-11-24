import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ value, onChangeText, placeholder = "Tìm kiếm" }) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={20} color="gray" />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 19,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 0,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
  },
});

export default SearchBar;
