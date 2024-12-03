import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import IconPen from "react-native-vector-icons/MaterialIcons";
import { fetchUserProfile } from "../../api/accountAPI/accountAPI";
import { deleteUserAddress } from "../../api/accountAPI/editAddressAPI";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

export const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchProfile = async () => {
        try {
          const data = await fetchUserProfile();
          // console.log("User data: ", data.user.address);
          setUser(data.user); // user.address contains an array of addresses
        } catch (error) {
          Alert.alert("Lỗi", "Không thể tải thông tin người dùng.");
          console.error(error);
        }
      };
      fetchProfile();
    }, [])
  );

  if (!user) return null;

  // Callback function to update address after edit
  const updateUserAddressFunction = (updatedAddress) => {
    setUser({
      ...user,
      address: user.address.map((item) =>
        item._id === updatedAddress._id ? updatedAddress : item
      ),
    });
  };

  // Delete address handler
  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteUserAddress(addressId); // API to delete address
      setUser({
        ...user,
        address: user.address.filter((item) => item._id !== addressId),
      });
      Alert.alert("Thành công", "Địa chỉ đã được xóa.");
    } catch (error) {
      Alert.alert("Lỗi", "Không thể xóa địa chỉ.");
      console.error(error);
    }
  };

  const renderAddressItem = ({ item }) => (
    <View style={styles.addressCard}>
      <View style={styles.addressItem}>
        <Text style={styles.addressTitle}>
          Tên người nhận: {item.recipientName}
        </Text>

        <Text style={styles.addressText}>Địa chỉ: {item.deliveryAddress}</Text>
        <Text style={styles.addressText}>
          Số điện thoại: {item.contactNumber}
        </Text>
      </View>
      <View style={styles.addressActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            navigation.navigate("EditAddressScreen", {
              address: item.deliveryAddress, // Chuyển thông tin địa chỉ
              recipient: item.recipientName,
              phone: item.contactNumber,
              addressId: item._id,
              updateUserAddressFunction, // Truyền hàm callback để cập nhật địa chỉ sau khi chỉnh sửa
            })
          }
        >
          <IconPen name="edit" size={20} color="#63c9c6" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleDeleteAddress(item._id)}
        >
          <Icon name="trash" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const AddressSection = () => (
    <View style={styles.listContent}>
      <View style={styles.addressHeader}>
        <Text style={styles.subtitle}>Địa chỉ</Text>
        <TouchableOpacity
          style={styles.addAddressButton}
          onPress={() => navigation.navigate("AddAddressScreen")}
        >
          <Icon name="add-circle-outline" size={20} color="#fff" />
          <Text style={styles.addAddressButtonText}>Thêm địa chỉ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Account info */}
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Thông tin tài khoản</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Edit", { user })}
          >
            <IconPen name="edit" size={20} color="#63c9c6" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user.fullName || user._id}</Text>
        <Text style={styles.info}>Số điện thoại: {user.phoneNumber}</Text>
        <Text style={styles.info}>Email: {user.email}</Text>
      </View>

      {/* Address List */}
      {/* <Text style={styles.sectionTitle}>Danh sách địa chỉ</Text> */}
      <AddressSection />
      {user.address && user.address.length > 0 ? (
        <FlatList
          data={user.address}
          renderItem={renderAddressItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.addressList}
        />
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ConfirmSignOut")}
      >
        <Text style={styles.buttonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#63c9c6",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  addressList: {
    paddingBottom: 20,
  },
  // addressCard: {
  //   backgroundColor: "#fff",
  //   paddingVertical: 10,
  //   paddingHorizontal: 15,
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#ddd",
  // },
  addressItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  addressText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
  addressActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  actionButton: {
    marginLeft: 15,
    marginTop: -49,
    padding: 6,
  },
  addAddressText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
  listContent: {
    width: "100%",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  addAddressButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#63c9c6",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  addAddressButtonText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#63c9c6",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

// export const ProfileScreen = ({ navigation }) => {
//   const [user, setUser] = useState(null);

//   useFocusEffect(
//     React.useCallback(() => {
//       const fetchProfile = async () => {
//         try {
//           const data = await fetchUserProfile();
//           setUser(data.user); // user.address chứa mảng các địa chỉ
//         } catch (error) {
//           Alert.alert("Lỗi", "Không thể tải thông tin người dùng.");
//           console.error(error);
//         }
//       };
//       fetchProfile();
//     }, [])
//   );

//   if (!user) return null;

//   // Hàm xóa địa chỉ
//   const handleDeleteAddress = async (addressId) => {
//     try {
//       await deleteUserAddress(addressId); // Gọi API để xóa địa chỉ
//       setUser({
//         ...user,
//         address: user.address.filter((item) => item.id !== addressId),
//       });
//       Alert.alert("Thành công", "Địa chỉ đã được xóa.");
//     } catch (error) {
//       Alert.alert("Lỗi", "Không thể xóa địa chỉ.");
//       console.error(error);
//     }
//   };

//   // Hàm render từng địa chỉ
//   const renderAddressItem = ({ item }) => (
//     <View style={styles.addressCard}>
//       <View style={styles.addressItem}>
//         <Text style={styles.addressTitle}>
//           Tên người nhận: {item.recipientName}
//         </Text>
//         <Text style={styles.addressText}>
//           Số điện thoại: {item.contactNumber}
//         </Text>
//         <Text style={styles.addressText}>Địa chỉ: {item.deliveryAddress}</Text>
//       </View>

//       <View style={styles.addressActions}>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() =>
//             navigation.navigate("EditAddressScreen", {
//               address: item,
//               phone: user.phoneNumber,
//               recipient: user.fullName,
//             })
//           }
//         >
//           <IconPen name="edit" size={20} color="#63c9c6" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => handleDeleteAddress(item.id)}
//         >
//           <Icon name="trash" size={20} color="#ccc" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Thông tin tài khoản */}
//       <View style={styles.card}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Thông tin tài khoản</Text>
//           <TouchableOpacity
//             onPress={() => navigation.navigate("Edit", { user })}
//           >
//             <IconPen name="edit" size={20} color="#63c9c6" />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.name}>{user.fullName || user._id}</Text>
//         <Text style={styles.info}>Số điện thoại: {user.phoneNumber}</Text>
//       </View>

//       {/* Danh sách địa chỉ */}
//       <Text style={styles.sectionTitle}>Danh sách địa chỉ</Text>
//       {user.address && user.address.length > 0 ? (
//         <FlatList
//           data={user.address}
//           renderItem={renderAddressItem}
//           keyExtractor={(item, index) => index.toString()}
//           contentContainerStyle={styles.addressList}
//         />
//       ) : null}
//     </View>
//   );
// };
