import React, { useState } from 'react';
import { Text, View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage, ref, uploadBytes, getDownloadURL } from '../firebase'; // Adjust the path to match your file structure

const HomeScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
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

      const imageName = `${Date.now()}.jpg`;

      // Get a reference to the storage bucket
      const storageRef = ref(storage, imageName);

      // Upload the image blob to Firebase Cloud Storage
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);

      console.log("Image uploaded to Firebase:", downloadURL);
    }
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Upload Image" onPress={pickImage} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

export default HomeScreen;
