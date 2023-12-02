import React, { useState } from 'react';
import { useNavigation, useRoute  } from '@react-navigation/native';
import { Text, View, Image, Button, StyleSheet, KeyboardAvoidingView, SafeAreaView, TouchableOpacity, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {db,doc, signOut, setDoc, auth, storage, ref, uploadBytes, getDownloadURL, getDocs, collection, runTransaction} from '../firebase'; 
import CustomKeyboardWrapper from '../conditionalComponents/CustomKeyboardWrapper';
import ChatroomComponent from '../essentialComponents/ChatroomComponent';
import ImageCloudUpload from '../essentialComponents/ImageCloudUpload';


const HomeScreen = () => {
  const [user2id, setUser2] = useState("");
  const [joinVal, setJoin] = useState("None")
  const userID = auth.currentUser.uid;
  const navigation = useNavigation()
  const inputContainerWidth = Platform.OS === 'web' ? '25%' : '60%';
  const buttonContainerWidth = Platform.OS === 'web' ? '15%' : '40%';

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
  const iterateUsers = async () => {
    let returnVal = ""
    //First transaction
    //Check matchedID and set looking flag to True if it is None
    //otherwise pass it as data to match later
    //transaction.get our user document to get a Documentsnapshot
    //.get<field> for matchedID
    //if None, do write
    //return false condition (procceed to join queue)
    //else return true condition
    //the tranasaction itself returns the matchedID (proceed to match with who wrote to you)

    //1)
    //Checks if anyone has written to the client user's matchedID
    //If not: set looking flag to true
    //return matchedID
    //if return is None, proceed with match
    //Otherwise attempt matching with return value
    const docRef = doc(db,'users',userID);
    try
    {
     const joinOrMatch = await runTransaction(db, async (transaction) => {
      const docSnapshot = await transaction.get(docRef);
      if (!docSnapshot.exists()) {
        throw "Document does not exist!";
      }
      const local_matchedID = docSnapshot.data().matchedID;
      if (local_matchedID === "None")
      {
        transaction.update(docRef, {looking: true});
      }
      return local_matchedID
      

      })
      console.log(joinOrMatch);
      setJoin(joinOrMatch)

    }
    catch (e) {
      console.error(e)
    }

    //depending on value of joinOrMatch we return or continue onto the next transaction
    //2)
    //Currently, iterates through every document
    //Writes to the last one in the iteration
    //-->
    //Make it iterate and write to the matched one

    if (joinVal === "None"){
    var finalWrite;
    try {
      returnVal = await runTransaction(db, async (transaction) => {
        const usersCollection = collection(db, "users");
        const querySnapshot = await getDocs(usersCollection);
  
        for (const doc of querySnapshot.docs) {
          const curDoc = await transaction.get(doc.ref);
          if (!curDoc.exists) {
            throw "Document does not exist!";
          }
          console.log(doc.id)
          // if match conditions, then finalWrite = doc and break
          if (doc.id !== userID) { //make it a transaction read
            finalWrite = doc
            break;
          }
           //should be in if match clause and create a break
        }
        const docSnapshot = await transaction.get(docRef);
        const local_matchedID = docSnapshot.data().matchedID;
        //const newEmail = finalWrite.data().matchedID + "write"; //currently pointing at the last doc iteration
        const newID = userID;
        transaction.update(finalWrite.ref, { matchedID: newID, looking: false});
        const temp = finalWrite.id
        if (local_matchedID === "None")
        {
          transaction.update(docRef, {looking: false});
        }
        console.log(temp);
        return temp;

      });
    } catch (e) {
      console.log("Failed", e);
    }
    // setUser2(returnVal);
    if (returnVal !== ""){
      navigation.navigate("MatchScreen", { match: returnVal, user: userID})
    }
  }
  else
  {
    navigation.navigate("MatchScreen", {match: joinVal, user: userID})
  }
  };
  //   const usersCollection = collection(db, "users");

  //   getDocs(usersCollection)
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         console.log("Document ID:", doc.id);
  //         if (doc.id !== userID){ //todo: check if the user is online
  //           setUser2(doc.id)
  //           console.log("MATCH:", user2id)
  //         }
  //         // You can access the document data using doc.data()
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error getting documents:", error);
  //     });
  // }
//DUMMY DATA TO TEST DATABASE
//TODO: MOVE THIS AFTER IMAGE UPLOAD, CORRESPOND THE DATA TO IMAGE METADATA.
 ;

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
            onPress={iterateUsers}
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
}
  })
