import React, { useEffect, useState} from 'react';
import styles from '../essentialComponents/Style';
import FlashButton from '../essentialComponents/FlashButton';
import { useNavigation } from '@react-navigation/native';
import { TouchableHighlight, Animated ,Pressable, TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Platform, TouchableWithoutFeedback, Image, ImageBackground} from 'react-native';
import {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '../firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomKeyboardWrapper from '../conditionalComponents/CustomKeyboardWrapper'; // Use relative path to the CustomKeyboardWrapper.js file

const LoginScreen = () => {
    

    /*
    Data required to process registration and login to application
    string: email
    string: password
    prop: navigation
    */
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()
    const inputContainerWidth = Platform.OS === 'web' ? '25%' : '60%';
    const buttonContainerWidth = Platform.OS === 'web' ? '15%' : '40%';
    //factor this out
    const [animation] = useState(new Animated.Value(1));

    const handlePressIn = () => {
      Animated.spring(animation, {
        toValue: 0.8,
        useNativeDriver: false,
      }).start();
    };
  
    const handlePressOut = () => {
      Animated.spring(animation, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: false,
      }).start();
    };
  
    const animatedStyle = {
      transform: [{ scale: animation }],
    };


    // Legacy code
    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             navigation.navigate("Home")
    //         }
    //     })
    //     return unsubscribe
    // }, [])


    // Eventually will have to rewrite login logic such that create profile presents a screen for user to enter details and upload images

    /*
    Registers a user to the database    
    @param None
    @returns None
    Attaches to an eventhandler and intializes a promise which:
    creates a user in the database if promise is fulfilled
    displays an error if promise is rejected
     */
    // todo: Make it redirect to a register screen
    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log(userCredential.user.email, "is registered");
        })
        .catch(error => alert(error.message))
    }
    /*
    Logs an existing user into the application
    @param None
    @returns None
    Attaches to an eventhandler and initializes a promise which:
    navigates to the main user interface if promise is fulfilled
    displays an error if promise is rejected
     
    */
    const handleLogin= (e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) =>
        {
            console.log(userCredential.user.email, "is logged in");
            if (userCredential)
            {
                navigation.navigate("Home")
            }
        }).catch(error => alert(error.message));
    }
    
    return (
        //May have to wrap everything in scrollview or write android specific code

        <CustomKeyboardWrapper>

        <View style = {styles.headerContainer}>
            <Text style = {styles.headerText}>
                Jiltd
            </Text>
            <Image source={{uri: 'https://i.imgur.com/6pxYtPw.png'}}
       style={{width: 100, height: 100}} />
        </View>
        <View style = {[styles.inputContainer, {width: inputContainerWidth}]}>
            <TextInput
                placeholder = "email"
                placeholderTextColor = "white"
                value = {email}
                onChangeText ={text => setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder = "password"
                placeholderTextColor = "white"
                value = {password}
                onChangeText ={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            />           
        </View>

        <View>

            <FlashButton pressFunc = {handleLogin} text={"CONTINUE"} ></FlashButton>
    
            <FlashButton pressFunc = {handleSignUp} text={"REGISTER"} ></FlashButton>

        </View>
      </CustomKeyboardWrapper>


    )
  }

export default LoginScreen
