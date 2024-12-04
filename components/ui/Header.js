import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
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
      <View style={styles.headerLogo}>
        <Image
          source={require("../../assets/lappu-store-logo.png")}
          style={styles.logo}
        />
      </View>

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
    height: 200, // Điều chỉnh chiều cao của Header
    justifyContent: "flex-start",
    paddingTop: 40, // Đệm trên (cho các thiết bị có tai thỏ)
    paddingBottom: 0,
    paddingHorizontal: 15,
    backgroundColor: "#63c9c6",
  },
  headerLogo: {
    alignItems: "center",
    marginTop: -10,
  },
  logo: {
    width: 100,
    height: 100,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: -35,
  },
  icon: {
    marginLeft: 5,
    marginTop: 8,
  },
  title: {
    color: "#000",
    fontSize: 14,
    marginTop: 8,
  },
});

export default Header;
