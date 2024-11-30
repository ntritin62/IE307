import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { getCurrentUserOrders } from "../../api/order/orderAPI";
import { OrderItemList } from "../../components/user/OrderItemList";
import { useIsFocused } from "@react-navigation/native";

export function OrderListScreen() {
  const [activeTab, setActiveTab] = useState("Hoạt động");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isFocused = useIsFocused();

  // Function to get the token from AsyncStorage
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // Assumes a single token key
      return token;
    } catch (error) {
      console.error("Failed to get token from AsyncStorage", error);
      return null;
    }
  };

  // Function to fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = await getToken(); // Retrieve token
      if (!token) {
        throw new Error("User is not authenticated.");
      }

      let orderData = [];
      if (
        activeTab === "Hoạt động" ||
        activeTab === "Hoàn tất" ||
        activeTab === "Đã hủy"
      ) {
        orderData = await getCurrentUserOrders(token); // Fetch orders
      }
      setOrders(orderData || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders whenever the active tab changes
  useEffect(() => {
    if (isFocused) {
      fetchOrders();
    }
  }, [activeTab, isFocused]);

  // Filter orders based on active tab selection
  const filteredData = (orders || []).filter((order) => {
    if (activeTab === "Hoạt động") {
      return ["pending", "paid", "delivering", "delivered"].includes(
        order.status
      );
    }
    if (activeTab === "Hoàn tất") {
      return order.status === "delivered";
    }
    if (activeTab === "Đã hủy") {
      return order.status === "canceled";
    }
    return false;
  });

  return (
    <View style={styles.container}>
      {/* Tab buttons */}
      <View style={styles.tabButtonsContainer}>
        {["Hoạt động", "Đã hủy", "Hoàn tất"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab content */}
      <View style={styles.tabContent}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            {filteredData.length > 0 ? (
              <FlatList
                data={filteredData}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <OrderItemList orders={[item]} />}
                contentContainerStyle={styles.flatListContainer}
                style={styles.flatList}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <Text style={styles.emptyText}>
                {activeTab === "Hoạt động"
                  ? "Không có đơn hàng nào."
                  : activeTab === "Đã hủy"
                  ? "Không có đơn hủy."
                  : "Không có đơn hoàn tất."}
              </Text>
            )}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
  },
  tabButtonsContainer: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 20,
    justifyContent: "space-between", // Ensures equal spacing between tabs
  },
  tabButton: {
    flex: 1, // This makes each tab take up equal space
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#f6f6f6",
  },
  activeTabButton: {
    borderBottomColor: "#3c4242",
  },
  tabText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#6c757d",
  },
  activeTabText: {
    fontWeight: "bold",
    color: "#3c4242",
  },
  tabContent: {
    flex: 1,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  flatList: {
    flex: 1,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#3c4242",
  },
  errorText: {
    textAlign: "center",
    color: "#ff4d4d",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#6c757d",
    fontSize: 16,
    marginTop: 20,
  },
});
