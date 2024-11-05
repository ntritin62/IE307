import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import ProductCard from './ProductCard'; // Đảm bảo ProductCard được import đúng
import Carousel from 'react-native-reanimated-carousel';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');
const COUNT = 2;

const SimilarProducts = ({ similarProducts, onProductPress }) => {
  const renderItem = ({ item }) => (
    <ProductCard key={item.id} product={item} onProductPress={onProductPress} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sản phẩm bạn có thể thích</Text>
      <Carousel
        data={similarProducts}
        renderItem={renderItem}
        width={width / COUNT}
        height={250}
        style={styles.carousel}
        loop={true}
        pagingEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  carousel: {
    width: '100%',
    justifyContent: 'center',
    gap: 15,
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
});

export default SimilarProducts;
