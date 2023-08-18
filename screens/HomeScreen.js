import React, { useState } from 'react';
import { Text, View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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
