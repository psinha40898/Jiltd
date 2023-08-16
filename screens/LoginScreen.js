import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, Text, View } from 'react-native';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from '../firebase';


const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             navigation.navigate("Home")
    //         }
    //     })
    //     return unsubscribe
    // }, [])

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log(userCredential.user.email, "is registered");
        })
        .catch(error => alert(error.message))
    }
    const handleLogin= (e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) =>
        {
            console.log(userCredential.user.email, "is logged in")
            if (userCredential)
            {
                navigation.navigate("Home")
            }
        }).catch(error => alert(error.message));
    }
    return (
      <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
      >
        <View style = {styles.inputContainer}>
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

        <View style={styles.buttonContainer}>
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
})