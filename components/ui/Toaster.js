import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../../constants/colors';

const Toaster = ({ title, type }) => {
  const typeColors = {
    success: {
      background: colors.success,
      icon: colors.success,
      text: colors.success,
      border: colors.success,
    },
    info: {
      background: colors.info,
      icon: colors.info,
      text: colors.info,
      border: colors.info,
    },
    warning: {
      background: colors.warning,
      icon: colors.warning,
      text: colors.warning,
      border: colors.warning,
    },
    error: {
      background: colors.error,
      icon: colors.error,
      text: colors.error,
      border: colors.error,
    },
  };

  const { background, icon, text, border } =
    typeColors[type] || typeColors.success;

  return (
    <View style={[styles.behind, { backgroundColor: background }]}>
      <View style={[styles.container, { borderBottomColor: border }]}>
        {type === 'success' ? (
          <AntDesign name="checkcircle" size={30} color={icon} />
        ) : type === 'info' ? (
          <AntDesign name="infocirlce" size={30} color={icon} />
        ) : (
          <AntDesign name="closecircle" size={30} color={icon} />
        )}

        <Text style={[styles.title, { color: text }]}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  behind: {
    width: 350,
    height: 90,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 10,
  },
  container: {
    height: 88,
    width: 350,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomWidth: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  message: {
    color: '#000',
    fontSize: 13,
  },
});

export default Toaster;
