import React, { useRef } from 'react';
import { TouchableOpacity, Animated, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const playButton = ({ onPress }) => {
  const animatedValue1 = useRef(new Animated.Value(1)).current;

  const handlePressIn = (animatedValue) => {
    Animated.spring(animatedValue, {
      toValue: 0.8,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = (animatedValue) => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: false,
    }).start();
  };

  const animatedStyle1 = {
    transform: [{ scale: animatedValue1 }],
  };


  return (
    <View style = {{flexDirection :"row"}}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => handlePressIn(animatedValue1)}
        onPressOut={() => handlePressOut(animatedValue1)}
        activeOpacity={0.7}
      >
        <Animated.View style={[styles.iconButton, animatedStyle1]}>
        <MaterialCommunityIcons name="cards-playing-heart" size={124}  color="rgba(204, 41, 54, .85)"/>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  iconButton: {
    // Adjust styling as needed
  },
};

export default playButton;
