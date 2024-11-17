import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import colors from "../../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome";

const SectionHeader = ({ title, editLinkEnabled, handlePress }) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.label}>{title}</Text>
      {editLinkEnabled ? (
        <Pressable style={styles.editLink} onPress={handlePress}>
          <Text style={styles.editText}>Sửa</Text>
          <Icon name="edit" size={15} color={colors["primary-700"]} />
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 5,
  },
  label: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 10,
    color: colors["primary-800"],
  },
  editLink: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 8,
    columnGap: 5,
  },
  editText: {
    color: colors["primary-700"],
  },
});

export default SectionHeader;
