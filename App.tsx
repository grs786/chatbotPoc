import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { DrawerNavigator } from "./src/Navigator/DrawerNavigator";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <DrawerNavigator />
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
