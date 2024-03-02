import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Modal, StyleSheet } from 'react-native';
import FlashButton from '../essentialComponents/FlashButton';

const ContextMenu = ({children}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleLongPress = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    setMenuPosition({ x: pageX, y: pageY });
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleOverlayPress = () => {
    setIsVisible(false);
  };
// the list of messages
// the list of buttons
  return (
    <View>
      <TouchableWithoutFeedback onLongPress={handleLongPress}>
        <View>
         {children}
        </View>
      </TouchableWithoutFeedback>
      
      <Modal
        visible={isVisible}
        transparent={true}
        onRequestClose={handleClose}
      >
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
          <View>
            <View style={[{ top: menuPosition.y, left: menuPosition.x }]}>
              <View>
              <Text> gift </Text>
             
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  modalContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  menu: {
    padding: 5,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContextMenu;
