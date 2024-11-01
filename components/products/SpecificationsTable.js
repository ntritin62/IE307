import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { formatProductSpecifications } from '../../services/productServices';

const SpecificationsTable = ({ product }) => {
  specifications = formatProductSpecifications(product);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Thông số kỹ thuật:</Text>
      {specifications.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.detail}>{item.detail}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    color: '#333',
  },
  detail: {
    flex: 2,
    color: '#555',
  },
});

export default SpecificationsTable;
