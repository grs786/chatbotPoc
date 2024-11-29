import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { DrawerNavigator } from "./src/Navigator/DrawerNavigator";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store/store";
import { LogBox } from "react-native";
import { PersistGate } from "redux-persist/integration/react";

LogBox.ignoreAllLogs(); // Specify the warning message to ignore

export default function App() {
 

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <DrawerNavigator />
            <Toast />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
