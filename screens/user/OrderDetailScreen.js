import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

export const OrderDetailScreen = ({ route }) => {
  const { order } = route.params;

  // Danh sách trạng thái và vị trí tương ứng
  const statuses = ["pending", "paid", "delivering", "delivered"];
  const currentStatusIndex = statuses.indexOf(order.status);

  // Hàm chuyển trạng thái sang văn bản hiển thị
  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xác nhận";
      case "paid":
        return "Chuẩn bị";
      case "delivering":
        return "Đang giao";
      case "delivered":
        return "Hoàn tất";
      default:
        return "Không xác định";
    }
  };

  return (
    <ScrollView style={styles.page}>
      <View style={styles.container}>
        {/* Thông tin đơn hàng */}
        <View style={styles.orderWrapper}>
          <Text style={styles.orderNumber}>Mã đơn hàng: {order._id}</Text>
          <Text style={styles.orderDate}>
            Ngày đặt: {new Date(order.createdAt).toLocaleString("vi-VN")}
          </Text>
          <Text style={styles.total}>
            Tổng tiền: <Text style={styles.totalPrice}>{order.total}</Text>
          </Text>
        </View>

        {/* Thanh trạng thái đơn hàng */}
        <View style={styles.progressTrack}>
          <View style={styles.progressBar}>
            {statuses.map((status, index) => (
              <View style={styles.progressItem} key={status}>
                {/* Vòng tròn trạng thái */}
                <View
                  style={[
                    styles.statusDot,
                    index <= currentStatusIndex && styles.activeDot,
                  ]}
                />
                {/* Dòng kết nối giữa các trạng thái */}
                {index < statuses.length - 1 && (
                  <View
                    style={[
                      styles.statusLine,
                      index < currentStatusIndex && styles.activeLine,
                    ]}
                  />
                )}
                {/* Văn bản trạng thái */}
                <Text
                  style={[
                    styles.statusText,
                    index <= currentStatusIndex && styles.activeText,
                  ]}
                >
                  {getStatusText(status)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Danh sách sản phẩm */}
        <View style={styles.orderItemsWrapper}>
          {order.orderItems.map((item) => (
            <View style={styles.itemWrapper} key={item._id}>
              <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemText}>Số lượng:1</Text>
                <Text style={styles.itemText}>Giá: {item.price}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 48,
    paddingBottom: 48,
  },
  container: {
    padding: 16,
  },
  orderWrapper: {
    marginBottom: 24,
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  orderDate: {
    fontSize: 14,
    color: "#808080",
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    color: "#4b5d67",
  },
  progressTrack: {
    marginVertical: 40,
    paddingHorizontal: 8,
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressItem: {
    alignItems: "center",
    //width: "25%",
    flex: 1,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ddd",
    marginBottom: 8,
  },
  activeDot: {
    backgroundColor: "rgb(99, 201, 198)",
  },
  statusLine: {
    position: "absolute",
    height: 2,
    width: "100%",
    backgroundColor: "#ddd",
    top: 6,
    zIndex: -1,
    left: 40,
  },
  activeLine: {
    backgroundColor: "rgb(99, 201, 198)",
  },
  statusText: {
    fontSize: 12,
    color: "#aaa",
  },
  activeText: {
    color: "black",
    fontWeight: "bold",
  },

  orderItemsWrapper: {
    marginTop: 40,
  },
  itemWrapper: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f7f7f7",
    paddingBottom: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemColor: {
    fontSize: 14,
    color: "#808080",
  },
  itemCalc: {
    // justifyContent: "flex-end",
    flex: 1,
  },
  itemText: {
    fontSize: 14,
    // fontWeight: "bold",
    color: "#808080",
  },
  itemBtn: {
    marginLeft: 16,
    alignSelf: "flex-start",
  },
  itemBtnText: {
    fontSize: 18,
    color: "#4b5d67",
  },
});
