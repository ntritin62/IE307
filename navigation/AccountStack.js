// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import { AccountScreen } from "../screens/user/AccountScreen"; // Đường dẫn tới AccountScreen
// import AddressScreen from "../screens/user/AddressScreen"; // Đường dẫn tới AddressScreen

// const Stack = createStackNavigator();

// export default function AccountStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Account"
//         component={AccountScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Address"
//         component={AddressScreen}
//         options={{ title: "Địa chỉ" }}
//       />
//     </Stack.Navigator>
//   );
// }

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreen } from "../screens/user/AccountScreen"; // Đường dẫn tới AccountScreen
import { EditProfileScreen } from "../screens/user/AddressScreen"; // Đường dẫn tới AddressScreen
import { ChangePasswordScreen } from "../screens/user/changePassword";
import { EditAddressScreen } from "../screens/user/changeAddress";
import { AddAddressScreen } from "../screens/user/addAddressScreen";

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit"
        component={EditProfileScreen}
        options={{
          title: "Chỉnh sửa thông tin",
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditAddressScreen"
        component={EditAddressScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddAddressScreen"
        component={AddAddressScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
