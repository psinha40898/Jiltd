import React, { useState } from 'react';
import { useNavigation, useRoute  } from '@react-navigation/native';
import { Text, View, Image, Button, StyleSheet, KeyboardAvoidingView, SafeAreaView, TouchableOpacity, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {db,doc, signOut, setDoc, auth, storage, ref, uploadBytes, getDownloadURL, getDocs, collection, runTransaction} from '../firebase'; 
import CustomKeyboardWrapper from '../conditionalComponents/CustomKeyboardWrapper';
import ChatroomComponent from '../essentialComponents/ChatroomComponent';
import ImageCloudUpload from '../essentialComponents/ImageCloudUpload';

const MatchScreen = () => {
    const route = useRoute()
    const navigation = useNavigation()
    matched = route.params?.match
    self = route.params?.user
    const inputContainerWidth = Platform.OS === 'web' ? '25%' : '60%';
    const buttonContainerWidth = Platform.OS === 'web' ? '15%' : '40%';
  
    const back = async () => {
        navigation.navigate("Home")

    
      }

    
    
    
    
    return (
        <SafeAreaView style={styles.container}>
               <View style={[styles.buttonContainer, {width: buttonContainerWidth}]}>
            <TouchableOpacity
            onPress={back}
            style={styles.button}
            >
            <Text style = {styles.buttonText}> back </Text>

          </TouchableOpacity>
          </View>

            <Text>{matched}</Text>
            <Text>{self}</Text>
            <View style={styles.chatroomContainer}>

          <ChatroomComponent user1Id={self} user2Id={matched} />
        
      </View>

            </SafeAreaView>



    )
};
export default MatchScreen
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
  }
    })
  
