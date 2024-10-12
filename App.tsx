import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { DrawerNavigator } from "./src/Navigator/DrawerNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        style="auto"
        barStyle="dark-content"
        hidden={true}
        translucent={false}
        
      />
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
