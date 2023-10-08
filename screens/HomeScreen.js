import React, { useState } from 'react';
import { Text, View, Image, Button, StyleSheet, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {db,doc, setDoc, auth, storage, ref, uploadBytes, getDownloadURL, getDocs, collection, runTransaction } from '../firebase'; 
import CustomKeyboardWrapper from '../conditionalComponents/CustomKeyboardWrapper';
import ChatroomComponent from '../essentialComponents/ChatroomComponent';


const HomeScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [user2id, setUser2] = useState("");
  const userID = auth.currentUser.uid;
  
  //This test function works in iterating through users
  //All reads must complete before writes
  //Should not modify application state (finalWrite)
  const iterateUsers = async () => {
    //First transaction
    //Check matchedID and set looking flag to True if it is None
    //otherwise pass it as data to match later
    //transaction.get our user document to get a Documentsnapshot
    //.get<field> for matchedID
    //if None, do write
    //return false condition (procceed to join queue)
    //else return true condition
    //the tranasaction itself returns the matchedID (proceed to match with who wrote to you)
    const docRef = doc(db,'users',userID);
    try
    {
     const joinOrMatch = await runTransaction(db, async (transaction) => {
      const docSnapshot = (await transaction.get(docRef));
      if (!docSnapshot.exists()) {
        throw "Document does not exist!";
      }
      const local_matchedID = docSnapshot.data().matchedID;
      console.log("TEST");
      if (local_matchedID === "None")
      {
        transaction.update(docRef, {looking: true});
      }
      return local_matchedID
      

      })
      console.log(joinOrMatch);

    }
    catch (e) {
      console.error(e)
    }

    //depending on value of joinOrMatch we return or continue onto the next transaction


    var finalWrite;
    try {
      await runTransaction(db, async (transaction) => {
        const usersCollection = collection(db, "users");
        const querySnapshot = await getDocs(usersCollection);
  
        for (const doc of querySnapshot.docs) {
          const curDoc = await transaction.get(doc.ref);
          if (!curDoc.exists) {
            throw "Document does not exist!";
          }
          console.log(doc.id);
          finalWrite = doc
        }
        const newEmail = finalWrite.data().email + "write";
        transaction.update(finalWrite.ref, { email: newEmail });

      });
    } catch (e) {
      console.log("Failed", e);
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
  const pickImage = async () => {
    // maybe something like filename: type
    //real email + most recent platform
    //use setDoc during registration
    //use updateDoc during profile edits
    const userData = {
      email: auth.currentUser.email,
      matchedID: "None",
      looking: false
    };
    const userDocumentRef = doc(db, 'users', userID); //creates a reference to a document where the ID is userID path users/userID
    await setDoc(userDocumentRef, userData); //creates the document if it doesnt exist
//END OF DUMMY DATA TO TEST DATABASE
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      setSelectedImage(selectedImageUri);

      const response = await fetch(selectedImageUri);
      const blob = await response.blob();
      const imageName =  `users/${userID}/images/${Date.now()}.jpg`
      // const imageName = `${Date.now()}.jpg`

      // Get a reference to the storage bucket
      const storageRef = ref(storage, imageName);

      // Upload the image blob to Firebase Cloud Storage
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);

      console.log("Image uploaded to Firebase:", downloadURL);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Jiltd</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Iterate" onPress={iterateUsers} />
        <Button title="Upload Image" onPress={pickImage} />
      </View>
      
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
      )}
      
      <View style={styles.chatroomContainer}>
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
    backgroundColor: 'white',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  chatroomContainer: {
    flex: 1,
    width: '100%',
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
