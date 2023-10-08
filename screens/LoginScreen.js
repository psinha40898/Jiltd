import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Platform, TouchableWithoutFeedback, Image} from 'react-native';
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

        <View style={[styles.buttonContainer, {width: buttonContainerWidth}]}>
            <TouchableOpacity
            onPress={handleLogin}
            style={styles.button}
            >
                <Text style = {styles.buttonText}> Log in  </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
            >
                <Text style = {styles.buttonOutlineText}> Create User </Text>

            </TouchableOpacity>

        </View>
      </CustomKeyboardWrapper>
    )
  }

export default LoginScreen

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
},
    
inputContainer: {
    width: '60%',

},
headerContainer: {
    flexDirection: 'row', // Make children (Text and Image) display in a row
    alignItems: 'center', // Vertically center-align the children
},
input: {
    backgroundColor: 'rgba(183, 13, 1, .5)',
    color: 'white',
    fontWeight: '100',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,

},
buttonContainer: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,

},
button: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(183, 13, 1, .7)',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 5,

},
buttonText: {
    color: 'white',
    fontWeight: '900',

},
buttonOutline: {
    backgroundColor: 'transparent'
    

},
buttonOutlineText: {
    color: 'white',
    fontWeight: '900',


},
headerText:{
    fontSize: 64,
    color: 'rgba(183, 13, 1, .7)',
    fontWeight: '100',
}
})