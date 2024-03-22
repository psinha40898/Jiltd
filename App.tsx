import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import MatchScreen from './screens/MatchScreen';
import UserProfile from './screens/UserProfile';
import RatingScreen from './screens/RatingScreen';
import RegisterScreen from './screens/RegisterScreen';
import SecondRegister from './screens/SecondRegister';
import TestMatch from './screens/TestMatch';
import HomePage from './screens/HomePage';
import Cmen from './screens/Cmen';
import { Auth } from 'firebase/auth'; // modulize this later
import AdminPanel from './screens/AdminPanel';

/*Creates Stack object from React Stack Navigator*/
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  MatchScreen: {match: string; self: string;}
  ProfileScreen: {param: Auth}
  RatingScreen: {ratee: string}
  HomePage: undefined;
  RegisterScreen: undefined;
  SecondRegister: {name: string};
  TestMatch: undefined;
  Cmen: undefined;
};
const Stack = createNativeStackNavigator();
const safeAreaInsets = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export default function App() {
  return (
   
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false}} name ="Login" component={LoginScreen}/>
        <Stack.Screen options={{ headerShown: false}} name="Home" component={AdminPanel} />
        <Stack.Screen options={{ headerShown: false}} name="MatchScreen" component={MatchScreen} />
        <Stack.Screen options={{ headerShown: false}} name="ProfileScreen" component={UserProfile} />
        <Stack.Screen options={{ headerShown: false}} name="HomePage" component={HomePage} />
        <Stack.Screen options={{ headerShown: false}} name="RatingScreen" component={RatingScreen} />
        <Stack.Screen options={{ headerShown: false}} name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen options={{ headerShown: false}} name="SecondRegister" component={SecondRegister} />
        <Stack.Screen options={{ headerShown: false}} name="TestMatch" component={TestMatch} />
        <Stack.Screen options={{ headerShown: false}} name="Cmen" component={Cmen} />
      </Stack.Navigator>
    </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
