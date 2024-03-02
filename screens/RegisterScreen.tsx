import { createUserWithEmailAndPassword, auth, doc, db, setDoc, getDoc } from "../firebase"
import FlashButton from "../essentialComponents/FlashButton";
import styles from "../essentialComponents/Style";
import { useState } from "react";
import { View, TextInput } from "react-native";

const RegisterScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const JiltedRegister = (email, password) => {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                    const userID = userCredential.user.uid;
                    const clientUserDocRef = doc(db, 'users', userID);
                    resolve([userID, clientUserDocRef]);
                })
                .catch(error => reject(error));
        });
    }
    
    const handleRegister = async (email, password) => {
        console.log("Being calledHR")
        try {
            const userCreds = await JiltedRegister(email, password);
            console.log("registered with default stats")
            await setDoc(userCreds[1], {email: auth.currentUser.email, jilt: true, rating: 0, matchedID: "None", inventory: [{count:1, name: "starterA", path: "items/starters/starterA.png"}]}, {merge: true})
        } catch (error) {
            alert(error.message);
        }
    }


    
    
    
    
    
    
    
    
    
    return (        <View>
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
        <FlashButton pressFunc={()=>handleRegister(email, password) } text={"Register"} ></FlashButton>        
    </View>)
}
export default RegisterScreen

