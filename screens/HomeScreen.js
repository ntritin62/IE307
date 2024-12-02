import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../components/ui/Header"; 
import Icon from "react-native-vector-icons/Ionicons"; // Thư viện Icon
import BannerSlider from "../components/ui/BannerSlider";

const HomePage = () => {
  const [searchText, setSearchText] = useState("");

  // Dữ liệu thương hiệu máy tính
  const brands = [
    {
      name: "Lenovo",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/5/59/Lenovo_ThinkPad_X1_Ultrabook_%28Nov_16%2C_2012%29.png",
      bgColor: "#D3E6F7",
    },
    {
      name: "Macbook",
      image:
        "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111902_mbp14-silver2.png",
      bgColor: "#EFF7D3",
    },
    {
      name: "LG",
      image:
        "https://product.hstatic.net/1000233206/product/laptop-lg-gram-2-in-1-2024-14t90s-g-ah55a5_6a659cc3ecef4fa1aed39e34cadbc3e8.png",
      bgColor: "#F7D3EA",
    },
    {
      name: "Dell",
      image:
        "https://laptop3mien.vn/wp-content/uploads/2019/12/dell-xps-9370_laptop3mien-3-600x600.png",
      bgColor: "#D3F7E0",
    },
    {
      name: "ASUS",
      image:
        "https://dlcdnwebimgs.asus.com/gain/6e7c2837-3d89-4f25-91a6-0dac53ecca51/",
      bgColor: "#F7E4D3",
    },
    {
      name: "Acer",
      image:
        "https://no1computer.vn/images/products/2021/12/28/large/6386_f127e1e9_7a6d_4bb7_b1df_2f931645c0cf_1640685475.png",
      bgColor: "#DBD3F7",
    },
  ];

  // Dữ liệu mã giảm giá
  const discountCodes = [
    { code: "DISCOUNT10", description: "Giảm 10%" },
    { code: "FREESHIP", description: "Miễn phí vận chuyển" },
    { code: "SALE20", description: "Giảm 20%" },
    { code: "HOTDEAL", description: "Khuyến mãi nóng" },
  ];

  // Dữ liệu sản phẩm
  const products = [
    {
      name: "Laptop Lenovo IdeaPad",
      image:
        "https://laptopaz.vn/media/product/2434_laptopaz_lenovo_ideapad_5_pro_14ach_4.jpg",
      price: "15,000,000 VND",
    },
    {
      name: "MacBook Pro 13-inch",
      image:
        "https://shopdunk.com/images/thumbs/0027507_macbook-pro-13-inch-m2-10-core-8gb-ram-512gb-ssd-chinh-hang-cu-dep.png",
      price: "25,000,000 VND",
    },
    {
      name: "Dell XPS 13",
      image:
        "https://mac24h.vn/images/detailed/90/DELL-XPS-13-9310-2021-H1_vz9k-rf.jpeg",
      price: "22,000,000 VND",
    },
    {
      name: "ASUS VivoBook",
      image:
        "https://dlcdnwebimgs.asus.com/gain/859297d3-da9f-4807-81e8-7a2fdf14204d/",
      price: "12,500,000 VND",
    },
    {
      name: "Macbook Pro 14",
      image:
        "https://taozinsaigon.com/files_upload/product/04_2022/macbook-pro-14-inch-2021-m1-pro-mau-bac.jpg",
      price: "32,000,000 VND",
    },
    {
      name: "Acer Aspire 7",
      image:
        "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2023_9_9_638298604979455222_acer-aspire-7-gaming-a715-76g-den-dd.jpg",
      price: "13,900,000 VND",
    },
  ];

  // Khai báo ref cho ScrollView của mã giảm giá
  const scrollViewRef = useRef();

  // Hàm để cuộn qua lại khi nhấn vào mũi tên
  const scrollTo = (direction) => {
    if (direction === "left") {
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
    } else {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header onSearch={(text) => setSearchText(text)} />

      {/* Nội dung chính */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BannerSlider contentContainerstyle={styles.bannerSlider} />
        <Text style={styles.sectionTitle}>Thương hiệu</Text>

        {/* Hiển thị các thương hiệu */}
        <View style={styles.brandGrid}>
          {brands.map((brand) => (
            <View
              key={brand.name}
              style={[styles.brandItem, { backgroundColor: brand.bgColor }]}
            >
              <Image
                source={{ uri: brand.image }} // Hình ảnh thương hiệu
                style={styles.brandImage}
              />
              <Text style={styles.brandName}>{brand.name}</Text>
            </View>
          ))}
        </View>

        {/* Mã giảm giá */}
        <Text style={styles.sectionTitle}>Mã giảm giá</Text>

        <View style={styles.discountContainer}>
          {/* Mũi tên trái */}
          <TouchableOpacity
            onPress={() => scrollTo("left")}
            style={styles.arrowButton}
          >
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          {/* ScrollView cho mã giảm giá */}
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.discountList}
          >
            {discountCodes.map((discount) => (
              <View key={discount.code} style={styles.discountItem}>
                <Text style={styles.discountCode}>{discount.code}</Text>
                <Text style={styles.discountDescription}>
                  {discount.description}
                </Text>
                <TouchableOpacity style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Lưu</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* Mũi tên phải */}
          <TouchableOpacity
            onPress={() => scrollTo("right")}
            style={styles.arrowButton}
          >
            <Icon name="arrow-forward" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Sản phẩm */}
        <Text style={styles.sectionTitle}>Sản phẩm</Text>

        <View style={styles.productGrid}>
          {products.map((product) => (
            <View key={product.name} style={styles.productItem}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 12,
  },
  brandGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
    marginHorizontal: 15,
  },
  brandItem: {
    width: "30%", // Điều chỉnh kích thước để hiển thị 5 cột
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  brandImage: {
    width: 80,
    height: 60,
    resizeMode: "contain",
  },
  brandName: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 5,
  },
  discountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#63c9c6",
    width: "100%",
    height: 100,
  },
  discountList: {
    flexDirection: "row",
  },
  discountItem: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#D3E6F7",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
  },
  discountCode: {
    fontWeight: "bold",
    fontSize: 16,
  },
  discountDescription: {
    fontSize: 12,
    color: "#777",
  },
  saveButton: {
    marginTop: 5,
    padding: 5,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 12,
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  productItem: {
    width: "48%", // Hiển thị 2 sản phẩm mỗi hàng
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",

    // Hiệu ứng bóng (shadow)
    shadowColor: "#000", // Màu bóng (sử dụng màu đen)
    shadowOffset: { width: 0, height: 4 }, // Độ lệch của bóng (chiều ngang và dọc)
    shadowOpacity: 0.1, // Độ mờ của bóng
    shadowRadius: 8, // Độ lớn của bóng (làm bóng lớn hơn)

    // Đảm bảo hiệu ứng bóng hiển thị trên Android
    elevation: 5, // Độ cao của phần tử, ảnh hưởng đến độ bóng trên Android
  },

  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 3,
  },
  productPrice: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
  },
  bannerSlider: {
    height: 40,
  },
});

export default HomePage;
