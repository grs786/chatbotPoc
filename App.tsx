import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { DrawerNavigator } from "./src/Navigator/DrawerNavigator";
import Toast from "react-native-toast-message";
import { Provider, useDispatch, useSelector } from "react-redux";
import { persistor, store } from "./src/store/store";
import { LogBox } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { userRequest } from "./src/store/Slices/userSlice/userSlice";
import { useAppSelector } from "./src/Hooks/useRedux";
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
