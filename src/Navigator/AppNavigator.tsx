import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS} from '../Common/screens';
import LoginScreen from '../Screens/LoginScreen';
import ChatScreen from '../Screens/ChatScreen';


const Stack = createNativeStackNavigator();

const ApplicationNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={SCREENS.ChatScreen}>
      <Stack.Screen
        name={SCREENS.LoginScreen}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREENS.ChatScreen}
        component={ChatScreen}
        options={{headerShown: false}}
      />
    
    
    </Stack.Navigator>
  );
};

export default ApplicationNavigator;
