// CustomTabIcon.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../../constants/colors';

const CustomTabIcon = ({ children, focused, color, size }) => {
  const backgroundColor = focused ? colors['primary-200'] : 'transparent';
  const iconColor = focused ? colors['primary-800'] : color;
  const iconSize = focused ? size + 4 : size;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {React.cloneElement(children, { color: iconColor, size: iconSize })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTabIcon;
