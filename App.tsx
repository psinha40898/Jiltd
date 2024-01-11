import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MatchScreen from './screens/MatchScreen';
import UserProfile from './screens/UserProfile';
import { Auth } from 'firebase/auth'; // modulize this later

/*Creates Stack object from React Stack Navigator*/
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  MatchScreen: {match: string; self: string;}
  ProfileScreen: {param: Auth}
};
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false}} name ="Login" component={LoginScreen}/>
        <Stack.Screen options={{ headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false}} name="MatchScreen" component={MatchScreen} />
        <Stack.Screen options={{ headerShown: false}} name="ProfileScreen" component={UserProfile} />
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
