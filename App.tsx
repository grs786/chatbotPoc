import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ApplicationNavigator from "./src/Navigator/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

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
        <ApplicationNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
