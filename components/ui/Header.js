import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "./SearchBar"; // Import thanh tìm kiếm
import Icon from "react-native-vector-icons/Ionicons"; // Thư viện Icon

const Header = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
    if (onSearch) {
      onSearch(text); // Gọi hàm callback khi nhập tìm kiếm
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        {/* Icon Vị trí */}
        <Icon
          name="location-outline"
          size={16}
          color="black"
          style={styles.icon}
        />

        {/* Tiêu đề */}
        <Text style={styles.title}>TP Thủ Đức</Text>
      </View>
      {/* Thanh tìm kiếm */}
      <SearchBar
        value={searchText}
        onChangeText={handleSearch}
        placeholder="Tìm kiếm sản phẩm"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 130, // Điều chỉnh chiều cao của Header
    justifyContent: "flex-start",
    paddingTop: 40, // Đệm trên (cho các thiết bị có tai thỏ)
    paddingBottom: 0,
    paddingHorizontal: 15,
    backgroundColor: "#fdf3f4", // Màu pastel tông mát (xanh dương nhạt)
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    marginLeft: 5,
    marginTop: 8,
  },
  title: {
    color: "black",
    fontSize: 12,

    marginTop: 8,
  },
});

export default Header;
