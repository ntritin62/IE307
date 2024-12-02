import React, { useState, useEffect, useRef } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { getProducts } from "../api/products/productsAPI";
import LoadingScreen from "./LoadingScreen";
import colors from "../constants/colors";
import format from "../services/formatVND";

const HomePage = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [productsLoading, setProductsLoading] = useState(true);

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

  useEffect(() => {
    const fetchProducts = async () => {
      const storedProducts = await getProducts();
      setProducts(storedProducts);
      setFilteredProducts(storedProducts);
      setProductsLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleSearch = () => {
      const filteredItems = products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProducts(filteredItems);
    };

    if (!productsLoading) {
      handleSearch();
    }
  }, [searchText]);

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

  if (productsLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header onSearch={(text) => setSearchText(text)} />

      {/* Nội dung chính */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {searchText ? null : (
          <View>
            <BannerSlider contentContainerstyle={styles.bannerSlider} />
            <Text style={styles.sectionTitle}>Thương hiệu</Text>

            {/* Hiển thị các thương hiệu */}
            <View style={styles.brandGrid}>
              {brands.map((brand) => (
                <TouchableOpacity
                  key={brand.name}
                  style={[styles.brandItem, { backgroundColor: brand.bgColor }]}
                  onPress={() =>
                    navigation.navigate("Products", {
                      brandName: brand.name.toLowerCase(),
                    })
                  }
                >
                  <Image
                    source={{ uri: brand.image }} // Hình ảnh thương hiệu
                    style={styles.brandImage}
                  />
                  <Text style={styles.brandName}>{brand.name}</Text>
                </TouchableOpacity>
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
          </View>
        )}

        {/* Sản phẩm */}
        <Text style={styles.sectionTitle}>Sản phẩm</Text>

        <View style={styles.productGrid}>
          {filteredProducts.map((product) => (
            <TouchableOpacity
              key={product._id}
              style={styles.productItem}
              onPress={() => {
                navigation.navigate("ProductDetails", {
                  productId: product._id,
                });
              }}
            >
              <Image
                source={{ uri: product.imageUrl }}
                style={styles.productImage}
              />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.currentPrice}>
                {format(
                  product.price - product.price * (product.saleOff / 100)
                )}
              </Text>
              {product.saleOff > 0 ? (
                <Text style={styles.oldPrice}>{format(product.price)}</Text>
              ) : null}
            </TouchableOpacity>
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
    backgroundColor: colors["primary-600"],
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
  currentPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors["primary-700"],
  },
  oldPrice: {
    fontSize: 12,
    color: "#888",
    textDecorationLine: "line-through",
  },
  bannerSlider: {
    height: 40,
  },
});

export default HomePage;
