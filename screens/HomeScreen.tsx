import React, { useState } from 'react';
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
      
      <View style={[styles.buttonContainer, {width: buttonContainerWidth}]}>
      <TouchableOpacity
            onPress={endButton}
            style={styles.button}
            >
            <Text style = {styles.buttonText}> Jilt </Text>

          </TouchableOpacity>

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
      width: '60%',
  
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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
