import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';

const LoopAnimation = ({ onPress, imageComponent }) => { //add parameters
  const animatedValue = useRef(new Animated.Value(1)).current;

  const breathingAnimation = Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 0.8,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
    ])
  );

  const handlePressIn = () => {

    Animated.spring(animatedValue, {
      toValue: 0.5,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: false,
    }).start();
    breathingAnimation.start();
  };
  useEffect(() => {
    breathingAnimation.start(); // Start breathing animation on mount
    return () => breathingAnimation.stop(); // Stop breathing animation on unmount
  }, []);
  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  return (
      <Animated.View style={[styles.iconButton, animatedStyle]}>
      {imageComponent}</Animated.View>
  );
};

const styles = {
  iconButton: {
    // Adjust styling as needed
  },
};

export default LoopAnimation;
