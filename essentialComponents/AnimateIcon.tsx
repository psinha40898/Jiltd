import React, { useRef } from 'react';
import { TouchableOpacity, Animated, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const AnimateIcon = ({ onPress, iconComponent  }) => {
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
    <View style = {{margin:20}}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => handlePressIn(animatedValue1)}
        onPressOut={() => handlePressOut(animatedValue1)}
        activeOpacity={0.7}
      >
        <Animated.View style={[{}, animatedStyle1]}>
        {iconComponent}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  iconButton: {
    alignSelf: 'flex-end'
    // Adjust styling as needed
  },
};

export default AnimateIcon;
