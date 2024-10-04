import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PastConversationsScreen from '../Screens/PastConversationScreen';
import {SCREENS} from '../Common/screens';
import ChatScreen from '../Screens/ChatScreen';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator  drawerContent={(props) => <PastConversationsScreen {...props}/>} initialRouteName={SCREENS.ChatScreen}>
      <Drawer.Screen name={SCREENS.ChatScreen} component={ChatScreen}  options={{ headerShown: false }}  /> 
      <Drawer.Screen name={SCREENS.PastconversationScreen} component={PastConversationsScreen}  options={{ headerShown: false }}  /> 
    </Drawer.Navigator>
  );
};


