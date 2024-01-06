import React, { useState } from 'react';
import styles from '../essentialComponents/Style';
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
    const matched = route.params?.match
    const me = route.params?.self
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

            <Text>{matched}TEST</Text>
            <Text>{me}TESTE</Text>
            <View style={styles.chatroomContainer}>

          <ChatroomComponent user1Id={me} user2Id={matched} />
        
      </View>

            </SafeAreaView>



    )
};
export default MatchScreen
