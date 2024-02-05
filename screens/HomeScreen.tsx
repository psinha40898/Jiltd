import React, { useState } from 'react';
import styles from '../essentialComponents/Style';
import FlashButton from '../essentialComponents/FlashButton';
import { matchMake } from './matchMake';
import type { RootStackParamList } from '../App';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute  } from '@react-navigation/native';
import { Text, View, Image, Button, StyleSheet, KeyboardAvoidingView, SafeAreaView, TouchableOpacity, Platform, Alert, Modal, Pressable,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {db,doc, signOut, setDoc, auth, storage, ref, uploadBytes, getDownloadURL, getDocs, collection, runTransaction} from '../firebase'; 
import CustomKeyboardWrapper from '../conditionalComponents/CustomKeyboardWrapper';
import ChatroomComponent from '../essentialComponents/ChatroomComponent';
import ImageCloudUpload from '../essentialComponents/ImageCloudUpload';



const HomeScreen = () => {
  const [user2id, setUser2] = useState("");
  const [modalVisible, setModalVisible] = useState(false);;
  const [matchedID_state, setMatch] = useState("None");
  const userID = auth.currentUser.uid;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const inputContainerWidth = Platform.OS === 'web' ? '25%' : '60%';
  const buttonContainerWidth = Platform.OS === 'web' ? '15%' : '40%';


  //TODO: reset both peoples' matchedID?
  const userButton = async () => {
    navigation.navigate("ProfileScreen", {param:auth})

  }
  
  const handleLogout= (e) =>{
    e.preventDefault();
    signOut(auth)
    .then(() =>
    {
      navigation.navigate("Login");
    }).catch(error => alert(error.message));
}

const testScreen = () => {
  navigation.navigate("Test");
}
const testMatch = () => {
  navigation.navigate("TestMatch");
}
  //This test function works in iterating through users
  //All reads must complete before writes
  //Should not modify application state (finalWrite)

  //1_4_2024
  //set the state
  const talkButton = async () => {
    console.log("THIS IS THE USER ID", userID);
    setModalVisible(true);
    //start loading screen
    //state = true
    await matchMake(userID, navigation);
    setModalVisible(false);
    //end loading screen
    //state = false
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
      <Image source={{uri: 'https://i.imgur.com/6pxYtPw.png'}}
       style={{width: 100, height: 100}} />
        
      </View>
      <View>

          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Searching...</Text>
          </View>
        </View>
      </Modal>
      <FlashButton pressFunc={talkButton} text={"Talk"}></FlashButton>
      <FlashButton pressFunc={handleLogout} text={"Log out"}></FlashButton>
      <FlashButton pressFunc={userButton} text={"My Profile"}></FlashButton>
      <FlashButton pressFunc={testScreen} text={"TEST"}></FlashButton>
      <FlashButton pressFunc={testMatch} text={"GO"} ></FlashButton>

      </View>
      

      
    </SafeAreaView>
  );
};
export default HomeScreen

