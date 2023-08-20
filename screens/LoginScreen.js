import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Platform  } from 'react-native';
import {auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '../firebase';


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
        
      <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
      >
        <View style = {styles.headerContainer}>
            <Text style = {styles.headerText}>
                Jiltd
            </Text>
        </View>
        <View style = {[styles.inputContainer, {width: inputContainerWidth}]}>
            <TextInput
                placeholder = "enter username"
                placeholderTextColor = "white"
                value = {email}
                onChangeText ={text => setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder = "enter password"
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
                <Text style = {styles.buttonText}> enter  </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
            >
                <Text style = {styles.buttonOutlineText}> create profile </Text>

            </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    )
  }

export default LoginScreen

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#D3EED6',
    justifyContent: 'center',
    alignItems: 'center',
},
    
inputContainer: {
    width: '60%',

},
input: {
    backgroundColor: 'rgba(58, 23, 114,1)',
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,

},
buttonContainer: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,

},
button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(58, 23, 114,1)',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 25,
    marginTop: 10,

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
    fontSize: 32,
    color: 'rgba(58, 23, 114,1)',
    fontWeight: '800',
}
})