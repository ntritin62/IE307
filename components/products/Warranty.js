import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../../constants/colors';
const Warranty = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bảo hành và khuyến mãi </Text>
      <View style={styles.textContainer}>
        <AntDesign name="checkcircle" size={30} color={colors.primary} />
        <Text style={styles.text}>Bảo hành chính hãng 24 tháng. </Text>
      </View>
      <View style={styles.textContainer}>
        <AntDesign name="checkcircle" size={30} color={colors.primary} />
        <Text style={styles.text}>Hỗ trợ đổi mới trong 7 ngày. </Text>
      </View>
      <View style={styles.textContainer}>
        <AntDesign name="checkcircle" size={30} color={colors.primary} />
        <Text style={styles.text}>Windows bản quyền tích hợp. </Text>
      </View>
      <View style={styles.textContainer}>
        <AntDesign name="checkcircle" size={30} color={colors.primary} />
        <Text style={styles.text}>Miễn phí giao hàng toàn quốc.</Text>
      </View>
    </View>
  );
};

export default Warranty;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
  },
  label: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 20,
  },
});
