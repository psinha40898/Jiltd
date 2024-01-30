import styles from '../essentialComponents/Style';
import React, { useState, useEffect } from 'react';
import type { RootStackParamList } from '../App';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, RouteProp, useNavigation, useRoute  } from '@react-navigation/native';
import { Text, View,  SafeAreaView, TouchableOpacity, Platform} from 'react-native';
import {doc, db, getDoc, getDocs} from '../firebase';
import FlashButton from '../essentialComponents/FlashButton';

//types
type ProfileScreenProp = RouteProp<RootStackParamList, "ProfileScreen">
interface Props{
  route?: ProfileScreenProp;
}


const UserProfile: React.FC<Props> =  (props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const clientUserID = props.route.params.param.currentUser.uid; // nice
    const [userData, setUserData] = useState<any>(null); // turn the state into a list
    const homeButton = () =>
    {
        navigation.navigate("Home")
        
    }
    //Note: dont think this useeffect needs to call the function..
    useEffect(() => {
        // This function runs after the initial render
        const fetchData = async () => {
          try {
            // Asynchronous operations (e.g., API call)
            const clientUserDocRef = doc(db,'users',clientUserID);
            const clientUserDocSnap = await getDoc(clientUserDocRef);
            const email = clientUserDocSnap.data().email;
            const inventory = clientUserDocSnap.data().inventory;
            //this works perfectly
            console.log("Is this working?", inventory[0].path);
            //console.log("A field from the object", inventory[0].path);
            setUserData(email);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
      
        // Invoke the asynchronous function
        fetchData();
      
        // Specify dependencies if needed
      }, []); 
    //1) Get the document for the current user in users collection
    //2) Retrieve shit from that document

    return (

        <SafeAreaView style={styles.container}>
             <Text style={{ color: 'white' }}> {props.route.params.param.currentUser.uid}</Text>
             <Text style={{ color: 'white' }}>  {userData} </Text>
            <FlashButton pressFunc={ homeButton} text={"Home!"}></FlashButton>

        </SafeAreaView>
    )

};
export default UserProfile;