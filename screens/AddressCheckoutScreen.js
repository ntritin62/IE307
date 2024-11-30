import React, { useState, useEffect } from "react";
import { RadioButton } from "react-native-radio-buttons-group";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import colors from "../constants/colors";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./LoadingScreen";
import { fetchUserProfile } from "../api/accountAPI/accountAPI";

export default function AddressCheckoutScreen() {
  const [addressList, setAddressList] = useState([]);
  const [addressListLoading, setAddressListLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  const getUserAddresses = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.get(
        `${apiUrl}/api/v1/addresses/showMyAddresses`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.addresses;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const storedAddresses = await getUserAddresses();
      setAddressList(storedAddresses);
    } catch (error) {
      console.log(error);
    } finally {
      setAddressListLoading(false);
    }
  };

  const handleSave = () => {
    if (selectedAddressId) {
      navigation.navigate("Checkout", { selectedAddressId });
    }
  };

  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const data = await fetchUserProfile();
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserAddressFunction = (updatedAddress) => {
    setUser({
      ...user,
      address: user.address.map((item) =>
        item._id === updatedAddress._id ? updatedAddress : item
      ),
    });
    fetchAddresses();
  };

  useEffect(() => {
    fetchAddresses();
    setSelectedAddressId(route.params?.selectedAddressId);
    fetchProfile();
  }, []);

  if (addressListLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.addressList}>
          {addressList.map((address) => (
            <View key={address._id} style={styles.addressSection}>
              <RadioButton
                id={address._id}
                label={
                  address.recipientName +
                  ", " +
                  address.deliveryAddress +
                  ", " +
                  address.contactNumber
                }
                selected={selectedAddressId === address._id}
                onPress={() => setSelectedAddressId(address._id)}
                containerStyle={styles.radioButton}
              />

              <TouchableOpacity
                style={styles.editLink}
                onPress={() =>
                  navigation.navigate("EditAddressCheckout", {
                    address: address.deliveryAddress,
                    recipient: address.recipientName,
                    phone: address.contactNumber,
                    addressId: address._id,
                    updateUserAddressFunction,
                  })
                }
              >
                <Text style={styles.editText}>Sửa</Text>
                <Icon name="edit" size={15} color={colors["primary-700"]} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {addressList.length > 0 ? (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Lưu</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddAddressCheckout")}
        >
          <Text style={styles.buttonText}>Thêm địa chỉ</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  addressList: {
    marginHorizontal: 10,
  },
  addressSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    height: 80,
  },
  radioButton: {
    maxWidth: "75%",
  },
  editLink: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    columnGap: 5,
  },
  editText: {
    color: colors["primary-700"],
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28ccc7",
    padding: 12,
    borderRadius: 20,
    marginVertical: 15,
    marginHorizontal: 10,
    columnGap: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
