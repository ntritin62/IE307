import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";

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

  return (
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
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerImage: {
    width: width * 1.0,
    height: 280,
    borderRadius: 10,
  },
});

export default BannerSlider;
