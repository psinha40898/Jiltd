import React, { useEffect, useState } from 'react';
import { TouchableHighlight, Animated ,Pressable, TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, Text, View, Platform, TouchableWithoutFeedback, Image} from 'react-native';
const FlashButton = ({pressFunc, text}) => {
    const [animation] = useState(new Animated.Value(1));

    const handlePressIn = () => {
      Animated.spring(animation, {
        toValue: 0.8,
        useNativeDriver: false,
      }).start();
    };
  
    const handlePressOut = () => {
      Animated.spring(animation, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: false,
      }).start();
    };
  
    const animatedStyle = {
      transform: [{ scale: animation }],
    };
return( 
  <TouchableHighlight
  onPress={pressFunc}
  onPressIn={handlePressIn}
  onPressOut={handlePressOut}
  underlayColor="transparent"
>
  <Animated.View style={[styles.button, animatedStyle]}>
    <Text style={styles.buttonText}>{[text]}</Text>
  </Animated.View>
</TouchableHighlight>
)
}
export default FlashButton
const styles = StyleSheet.create(
  {
  button: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(204, 41, 54, .85)',
    paddingHorizontal: 10,
    paddingVertical: 12.5,
    borderRadius: 5,
    marginTop: 20
},
buttonText: {
    color: 'white',
    fontWeight: '900',

},
}
)
