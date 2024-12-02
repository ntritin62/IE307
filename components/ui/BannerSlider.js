import React, { useRef, useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Thư viện Icon

const { width } = Dimensions.get("window");

const banners = [
  {
    id: 1,
    image:
      "https://thietkehaithanh.com/wp-content/uploads/2019/01/thietkehaithanh-banner-laptop-2.png",
  },
  {
    id: 2,
    image:
      "https://thietkehaithanh.com/wp-content/uploads/2019/01/thietkehaithanh-banner-laptop-2.png",
  },
  {
    id: 3,
    image:
      "https://thietkehaithanh.com/wp-content/uploads/2019/01/thietkehaithanh-banner-laptop-2.png",
  },
];

const BannerSlider = () => {
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % banners.length;
      flatListRef.current.scrollToIndex({
        index: currentIndex.current,
        animated: true,
      });
    }, 4000); // Thời gian chuyển slide

    return () => clearInterval(interval);
  }, []);

  // Hàm để cuộn trang theo chiều trái hoặc phải
  const scrollTo = (direction) => {
    if (direction === "left") {
      currentIndex.current =
        (currentIndex.current - 1 + banners.length) % banners.length;
    } else {
      currentIndex.current = (currentIndex.current + 1) % banners.length;
    }
    flatListRef.current.scrollToIndex({
      index: currentIndex.current,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={banners}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        ref={flatListRef}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.bannerContainer}>
            <Image source={{ uri: item.image }} style={styles.bannerImage} />
          </View>
        )}
      />
      {/* Mũi tên trái */}
      <TouchableOpacity
        onPress={() => scrollTo("left")}
        style={[styles.arrowButton, styles.arrowLeft]}
      >
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      {/* Mũi tên phải */}
      <TouchableOpacity
        onPress={() => scrollTo("right")}
        style={[styles.arrowButton, styles.arrowRight]}
      >
        <Icon name="arrow-forward" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerImage: {
    width: width * 1.0,
    height: 200,
    borderRadius: 0,
  },
  arrowButton: {
    position: "absolute",
    top: "45%",
    zIndex: 1,
    padding: 5,
  },
  arrowLeft: {
    left: 10, // Mũi tên trái nằm bên trái
    transform: [{ translateY: -12 }], // Căn giữa theo chiều dọc
  },
  arrowRight: {
    right: 10, // Mũi tên phải nằm bên phải
    transform: [{ translateY: -12 }], // Căn giữa theo chiều dọc
  },
});

export default BannerSlider;
