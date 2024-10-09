import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../Common/screens";
import ChatScreen from "../Screens/ChatScreen";
import { DrawerNavigator } from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

const ApplicationNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={SCREENS.ChatScreen}>
    
      <Stack.Screen
        name={SCREENS.ChatScreen}
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.DrawerScreen}
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ApplicationNavigator;
