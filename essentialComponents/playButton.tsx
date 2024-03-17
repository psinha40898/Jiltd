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
      
        <Animated.View style={[animatedStyle1, { padding: 10, backgroundColor: 'rgba(72, 72, 72, 1),', shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.53,
shadowRadius: 2.62,

elevation: 4, borderRadius: 20, borderWidth: 1}]}>
          <View style = {{flexDirection: "row", alignItems: 'center'}} > 

          <View style = {{marginTop: 5}}>
            <MaterialCommunityIcons name="cards-playing-heart" size={128}  color={theme}/>
          </View>
       
            </View>
  
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};



export default playButton;
