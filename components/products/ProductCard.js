import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';
import format from '../../services/formatVND';
import { newPrice } from '../../services/productServices';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product, onProductPress }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onProductPress(product._id)}
    >
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{product.saleOff}% OFF</Text>
      </View>

      <Image
        source={{
          uri: product.imageUrl,
        }}
        style={styles.productImage}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>
            {format(newPrice(product.price, product.saleOff))}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    minHeight: 220,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2,
    backgroundColor: colors.primary,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors['primary-800'],
  },
  originalPrice: {
    fontSize: 11,
    color: '#ccc',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default ProductCard;
