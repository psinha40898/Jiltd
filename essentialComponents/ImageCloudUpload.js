import React, { useState } from 'react';
import { Text, View, Image, Button, StyleSheet, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {db,doc, setDoc, auth, storage, ref, uploadBytes, getDownloadURL } from '../firebase'; 

const ImageCloudUpload = ({ auth, userID }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImage = async () => {
        // maybe something like filename: type
        //real email + most recent platform
        //use setDoc during registration
        //use updateDoc during profile edits
        const userData = {
          email: auth.currentUser.email,
          matchedID: "None",
          rating : 1500,
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
      return(
    <View>

      
        <Button title="Upload Image" onPress={pickImage} />
      
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
      )}
      
    </View>
  );




      

}

export default ImageCloudUpload;
const styles = StyleSheet.create({

      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
      },

})