import React, { useRef } from 'react';
import { TouchableOpacity, Animated, View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './Style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const playButton = ({ onPress, theme }) => {
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
      
        <Animated.View style={[animatedStyle1]}>
          <View style = {{flexDirection: "row"}} > 
          <View style = {{marginTop: 10}}><MaterialCommunityIcons name="cards-playing-heart" size={64}  color={theme}/></View>
          
          <Text style={[styles.size2, styles.bold, {color:theme, marginTop: 0}]}>Play</Text>
          
      
            </View>
  
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};



export default playButton;
