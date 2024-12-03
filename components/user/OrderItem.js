import React from "react";
import PropTypes from "prop-types";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";

export function OrderItem({ order }) {
  const navigation = useNavigation();

  // Hàm chuyển trạng thái sang văn bản hiển thị
  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "paid":
        return "Đã thanh toán";
      case "delivering":
        return "Đang giao";
      case "delivered":
        return "Hoàn tất";
      default:
        return "Không xác định";
    }
  };

  return (
    <View style={styles.orderItemWrapper}>
      <View style={styles.orderItemDetails}>
        <Text style={styles.orderItemTitle}>Mã đơn hàng: {order._id}</Text>
        <View style={styles.orderInfoGroup}>
          <View style={styles.orderInfoItem}>
            <Text style={styles.textGray}>Ngày đặt:</Text>
            <Text style={styles.text}>
              {new Date(order.createdAt).toLocaleDateString("vi-VN")}
            </Text>
          </View>
          <View style={styles.orderInfoItem}>
            <Text style={styles.textGray}>Tình trạng:</Text>
            <Text style={styles.text}>{getStatusText(order.status)}</Text>
          </View>
          <View style={styles.orderInfoItem}>
            <Text style={styles.textGray}>Số lượng:</Text>
            <Text style={styles.text}>{order.orderItems.length}</Text>
          </View>
        </View>
      </View>

      <View style={styles.orderOverview}>
        <View style={styles.orderOverviewContent}>
          <View style={styles.orderOverviewImg}>
            <Image
              source={{ uri: order.orderItems[0].imageUrl }}
              style={styles.objectFitCover} // Đảm bảo có style cho ảnh
              resizeMode="cover"
            />
          </View>
          <View style={styles.orderOverviewInfo}>
            <Text style={styles.textXl}>{order.orderItems[0].name}</Text>
            <View>
              <Text style={styles.fontBold}>
                Số lượng: <Text style={styles.text}>1</Text>
              </Text>
              <Text style={styles.fontBold}>
                Giá:{" "}
                <Text style={styles.text}>{order.orderItems[0].price}</Text>
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.viewDetailBtn}
          onPress={() => {
            navigation.navigate("OrderDetail", { order });
          }}
        >
          <Text style={styles.viewDetailText}>Chi tiết</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

OrderItem.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    orderItems: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        imageUrl: PropTypes.any.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  orderItemWrapper: {
    marginVertical: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 5,
  },
  orderItemTitle: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  orderItemDetails: {
    padding: 16,
  },
  orderInfoGroup: {
    flexDirection: "column",
  },
  orderInfoItem: {
    flexDirection: "row",
    columnGap: 5,
  },
  textGray: {
    color: "#757575",
    fontWeight: "500",
  },
  text: {
    color: colors["primary-600"],
    fontSize: 14,
    fontWeight: "bold",
  },
  orderOverview: {
    marginHorizontal: 10,
  },
  orderOverviewContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  orderOverviewImg: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  objectFitCover: {
    width: "100%",
    height: "100%",
  },
  orderOverviewInfo: {
    marginLeft: 12,
    flex: 1,
  },
  textXl: {
    fontSize: 16,
    fontWeight: "bold",
  },
  fontBold: {
    fontWeight: "600",
  },
  viewDetailBtn: {
    backgroundColor: "#10b9b0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  viewDetailText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
