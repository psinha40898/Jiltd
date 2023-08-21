import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CustomKeyboardWrapper = ({ children }) => {
  if (Platform.OS === 'ios') {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
        >
          {children}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        behavior="padding"
      >
        {children}
      </KeyboardAwareScrollView>
    );
  }
};

export default CustomKeyboardWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3EED6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
