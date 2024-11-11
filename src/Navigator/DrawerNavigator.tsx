import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import PastConversationsScreen from "../Screens/PastConversationScreen";
import { SCREENS } from "../Common/screens";
import ChatScreen from "../Screens/ChatScreen";
import { Dimensions } from "react-native";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: Dimensions.get("window").width / 1.2,
        },
        headerShown: false,
      }}
      drawerContent={(props) => <PastConversationsScreen {...props} />}
      initialRouteName={SCREENS.ChatScreen}
    >
      <Drawer.Screen name={SCREENS.ChatScreen} component={ChatScreen} />
    </Drawer.Navigator>
  );
};
