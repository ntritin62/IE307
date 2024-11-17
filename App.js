import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductDetailScreen from "./screens/ProductDetailsScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "./constants/colors";
import CustomTabIcon from "./components/ui/CustomTabIcon";
import HomeScreen from "./screens/HomeScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import ProductsScreen from "./screens/ProductsScreen";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import OrderSuccessScreen from "./screens/OrderSuccessScreen";
import { StripeProvider } from "@stripe/stripe-react-native";

const Stack = createStackNavigator();

const BottomTab = createBottomTabNavigator();

function BottomNavigation() {
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
        component={CartScreen}
        options={{
          title: "Giỏ hàng",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size, focused }) => (
            <CustomTabIcon focused={focused} size={size} color={color}>
              <MaterialIcons
                name="shopping-cart"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <StripeProvider publishableKey={process.env.STRIPE_PUBLISHABLE_KEY}>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      <StackNavigator />
    </StripeProvider>
  );
}
