import React, { useState, useEffect, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StripeProvider } from "@stripe/stripe-react-native";

import ProductDetailScreen from "./screens/ProductDetailsScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import OrderSuccessScreen from "./screens/OrderSuccessScreen";
import OrderStack from "./navigation/OrderStack";
import AccountStack from "./navigation/AccountStack";
import SignOutScreen from "./screens/user/SignOut";
import { UserMenu } from "./components/user/UserMenu";
import CustomTabIcon from "./components/ui/CustomTabIcon";
import colors from "./constants/colors";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import NonAccountScreen from "./screens/NonAccountScreen";
import { AuthProvider, AuthContext } from "./services/AuthContext";
import Badge from "./components/cart/Badge";
import { getUserCart } from "./api/products/cartsAPI";
import AddressCheckoutScreen from "./screens/AddressCheckoutScreen";
import { getStripePublishableKey } from "./api/products/ordersAPI";
import { AddAddressScreen } from "./screens/user/addAddressScreen";
import { EditAddressScreen } from "./screens/user/changeAddress";

const TopTab = createMaterialTopTabNavigator();
const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

/** Account Top Tabs */
const AccountTabs = () => (
  <View style={{ flex: 1 }}>
    {/* <View
      style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1 }}
    >
      <UserMenu />
    </View> */}
    <TopTab.Navigator
      screenOptions={{
        tabBarStyle: { marginTop: 20 },
      }}
    >
      <TopTab.Screen name="My Orders" component={OrderStack} />
      <TopTab.Screen name="My Account" component={AccountStack} />
    </TopTab.Navigator>
  </View>
);

/** Bottom Tab Navigator */
function BottomNavigation() {
  const { token } = useContext(AuthContext);
  const [cartLength, setCartLength] = useState(0);
  const isFocused = useIsFocused();

  const fetchCartLength = async () => {
    try {
      const storedCart = await getUserCart();
      setCartLength(storedCart.cartItems.length);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchCartLength();
  }, [isFocused, fetchCartLength]);

  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 65,
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 20,
        },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <CustomTabIcon focused={focused} size={size} color={color}>
              <AntDesign
                name="home"
                color={focused ? colors["primary-800"] : color}
                size={focused ? size + 4 : size}
              />
            </CustomTabIcon>
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <CustomTabIcon focused={focused} size={size} color={color}>
              <MaterialIcons
                name="category"
                color={focused ? colors["primary-800"] : color}
                size={focused ? size + 4 : size}
              />
            </CustomTabIcon>
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={token !== null ? CartScreen : NonAccountScreen}
        options={{
          title: "Giỏ hàng",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size, focused }) => (
            <View>
              <CustomTabIcon focused={focused} size={size} color={color}>
                <MaterialIcons
                  name="shopping-cart"
                  color={focused ? colors["primary-800"] : color}
                  size={focused ? size + 4 : size}
                />
              </CustomTabIcon>
              {cartLength > 0 ? <Badge count={cartLength} /> : null}
            </View>
          ),
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={token !== null ? AccountTabs : NonAccountScreen}
        options={{
          headerShown: false,
          // title: "Tài khoản", // Bạn có thể thêm title nếu cần
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size, focused }) => (
            <CustomTabIcon focused={focused} size={size} color={color}>
              <Icon
                name="person"
                color={focused ? colors["primary-800"] : color}
                size={focused ? size + 4 : size}
              />
            </CustomTabIcon>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/** Stack Navigator */
function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={BottomNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{
            title: "Thanh toán",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="OrderSuccess"
          component={OrderSuccessScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: "Đăng nhập",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: "Đăng ký",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="AddressCheckout"
          component={AddressCheckoutScreen}
          options={{
            title: "Danh sách địa chỉ",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="AddAddressCheckout"
          component={AddAddressScreen}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="EditAddressCheckout"
          component={EditAddressScreen}
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="ConfirmSignOut"
          component={SignOutScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [publishableKey, setPublishableKey] = useState(null);

  const fetchPublishableKey = async () => {
    try {
      const storedKey = await getStripePublishableKey();
      setPublishableKey(storedKey);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPublishableKey();
  }, []);

  return (
    <StripeProvider publishableKey={publishableKey}>
      <AuthProvider>
        <StatusBar barStyle="light-content" backgroundColor="#fff" />
        <StackNavigator />
      </AuthProvider>
    </StripeProvider>
  );
}
