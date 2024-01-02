import React, { useState } from 'react';
import { matchMake } from './matchMake';
import type { RootStackParamList } from '../App';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute  } from '@react-navigation/native';
import { Text, View, Image, Button, StyleSheet, KeyboardAvoidingView, SafeAreaView, TouchableOpacity, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {db,doc, signOut, setDoc, auth, storage, ref, uploadBytes, getDownloadURL, getDocs, collection, runTransaction} from '../firebase'; 
import CustomKeyboardWrapper from '../conditionalComponents/CustomKeyboardWrapper';
import ChatroomComponent from '../essentialComponents/ChatroomComponent';
import ImageCloudUpload from '../essentialComponents/ImageCloudUpload';


const HomeScreen = () => {
  const [user2id, setUser2] = useState("");
  const [joinVal, setJoin] = useState("None");
  const userID = auth.currentUser.uid;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const inputContainerWidth = Platform.OS === 'web' ? '25%' : '60%';
  const buttonContainerWidth = Platform.OS === 'web' ? '15%' : '40%';

  //TODO: reset both peoples' matchedID?
  const endButton = async () => {
    setUser2("");

  }
  
  const handleLogout= (e) =>{
    e.preventDefault();
    signOut(auth)
    .then(() =>
    {
      navigation.navigate("Login");
    }).catch(error => alert(error.message));
}
  //This test function works in iterating through users
  //All reads must complete before writes
  //Should not modify application state (finalWrite)
  const talkButton = async () => {
    await matchMake(userID, setJoin, joinVal, navigation);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
      <Image source={{uri: 'https://i.imgur.com/6pxYtPw.png'}}
       style={{width: 100, height: 100}} />
        
      </View>
      
      <View style={[styles.buttonContainer, {width: buttonContainerWidth}]}>
      <TouchableOpacity
            onPress={endButton}
            style={styles.button}
            >
            <Text style = {styles.buttonText}> Jilt </Text>

          </TouchableOpacity>

          
      <TouchableOpacity
            onPress={talkButton}
            style={styles.button}
            >
            <Text style = {styles.buttonText}> Talk </Text>
            
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            style={styles.button}
            >
            <Text style = {styles.buttonText}> LOG OUT </Text>

          </TouchableOpacity>
      </View>
      
      <View style={[styles.buttonContainer, {width: buttonContainerWidth}]}>
        <ImageCloudUpload auth = {auth} userID={ userID}></ImageCloudUpload>

      </View> 
      <View style={styles.chatroomContainer}>
      {/* <ChatroomComponent user1Id={userID} user2Id="kiKA7MciO7Y3mdyIxvqZ1T6dXxa2" /> */}
        {user2id !== "" && (
          <ChatroomComponent user1Id={userID} user2Id={user2id} />
        )}
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19180A',
    justifyContent: 'center',
    alignItems: 'center',
  },
      
  inputContainer: {
      width: '60%',
  
  },
  input: {
      backgroundColor: 'rgba(58, 23, 114,1)',
      color: 'rgba(183, 13, 1, .5)',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderRadius: 5,
      marginTop: 10,
  
  },
  buttonContainer: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,

},
button: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(183, 13, 1, .7)',
    paddingHorizontal: 10,
    paddingVertical: 12.5,
    borderRadius: 5,
    marginTop: 10


},
  chatroomContainer: {
    flex: 1,
    width: '100%',
  },

  buttonText: {
      color: 'white',
      fontWeight: '700',
  
  },
  buttonOutline: {
      backgroundColor: 'rgba(58, 23, 114,1)',
      
  
  },
  buttonOutlineText: {
      color: 'white',
      fontWeight: '700',
  
  },
  headerText:{
    fontSize: 64,
    color: 'rgba(183, 13, 1, .7)',
    fontWeight: '100',
},

headerContainer: {
  flexDirection: 'row', // Make children (Text and Image) display in a row
  alignItems: 'center', // Vertically center-align the children
},
  })
