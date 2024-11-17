import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const categories = [
  {
    name: 'Lenovo',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/5/59/Lenovo_ThinkPad_X1_Ultrabook_%28Nov_16%2C_2012%29.png',
    bgColor: '#D3E6F7',
  },
  {
    name: 'Macbook',
    image:
      'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111902_mbp14-silver2.png',
    bgColor: '#EFF7D3',
  },
  {
    name: 'LG',
    image:
      'https://product.hstatic.net/1000233206/product/laptop-lg-gram-2-in-1-2024-14t90s-g-ah55a5_6a659cc3ecef4fa1aed39e34cadbc3e8.png',
    bgColor: '#F7D3EA',
  },
  {
    name: 'Dell',
    image:
      'https://laptop3mien.vn/wp-content/uploads/2019/12/dell-xps-9370_laptop3mien-3-600x600.png',
    bgColor: '#D3F7E0',
  },
  {
    name: 'ASUS',
    image:
      'https://dlcdnwebimgs.asus.com/gain/6e7c2837-3d89-4f25-91a6-0dac53ecca51/',
    bgColor: '#F7E4D3',
  },
  {
    name: 'Acer',
    image:
      'https://no1computer.vn/images/products/2021/12/28/large/6386_f127e1e9_7a6d_4bb7_b1df_2f931645c0cf_1640685475.png',
    bgColor: '#DBD3F7',
  },
];

export default function CategoriesScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const navigateHandler = (item) => {
    navigation.navigate('Products', { brandName: item.name.toLowerCase() });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.name}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryContainer,
              { backgroundColor: item.bgColor },
            ]}
            onPress={() => {
              navigateHandler(item);
            }}
          >
            <View style={styles.image}>
              <Image
                source={{
                  uri: item.image,
                }}
                style={styles.image}
              />

              <Text style={styles.categoryText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
  },
  filterIcon: {
    marginLeft: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  categoryContainer: {
    flex: 1,
    margin: 10,
    height: 150,
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors['primary-200'],
  },
  image: {
    width: '90%',
    height: '80%',
    objectFit: 'contain',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 18,
    color: '#3D3014',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
