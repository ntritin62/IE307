import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { getProducts } from '../api/products/productsAPI';
import LoadingScreen from './LoadingScreen';
import ProductCard from '../components/products/ProductCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ProductsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [products, setProducts] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts(route.params.brandName);
      setProducts(result);
      setFilteredProducts(result); // Hiển thị tất cả sản phẩm ban đầu
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  };

  const handleSort = () => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price; // Ascending order
      } else {
        return b.price - a.price; // Descending order
      }
    });
    setFilteredProducts(sortedProducts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
  };

  if (products == null || filteredProducts == null) {
    return <LoadingScreen />;
  }

  return (
    <>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="left" size={30} color={colors.primary} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Ionicons name="search" size={20} color={colors['primary-800']} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.center}>
            <Text style={styles.title}>
              {route.params.brandName.charAt(0).toUpperCase() +
                route.params.brandName.slice(1)}
            </Text>
            <TouchableOpacity onPress={handleSort}>
              <FontAwesome
                name="sort"
                size={24}
                color={colors['primary-800']}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.quantity}>
            {filteredProducts.length} sản phẩm
          </Text>
        </View>

        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onProductPress={() => {
                navigation.navigate('ProductDetails', { productId: item._id });
              }}
            />
          )}
        />
      </View>
    </>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  row: {
    justifyContent: 'space-between',
  },
  backButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 20,
  },
  title: {
    color: colors['primary-700'],
    fontWeight: 'bold',
    fontSize: 26,
  },
  quantity: {
    color: '#444',
    fontWeight: '500',
  },
  infoContainer: {
    gap: 15,
    marginBottom: 20,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    width: 280,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: colors['primary-200'],
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
