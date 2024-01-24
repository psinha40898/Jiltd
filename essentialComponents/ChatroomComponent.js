
import React, { useState, useEffect, } from 'react';
import styles from './Style';
import { Platform, View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, onKeyDown, TouchableOpacity, Text } from 'react-native';
import { GiftedChat, InputToolbar, Send  } from 'react-native-gifted-chat';
//send.js from giftedchat is modified
import { doc, db, collection, onSnapshot, addDoc, Timestamp, getDoc, setDoc, updateDoc } from '../firebase';
import CustomKeyboardWrapper from '../conditionalComponents/CustomKeyboardWrapper'; // Use relative path to the CustomKeyboardWrapper.js file
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';




const ChatroomComponent = ({ user1Id, user2Id }) => {
  const [messages, setMessages] = useState([]);

  const smallerUserId = user1Id < user2Id ? user1Id : user2Id;
  const largerUserId = user1Id < user2Id ? user2Id : user1Id;

  const chatroomDocRef = doc(db, 'chatrooms', `${smallerUserId}_${largerUserId}`);
  const messagesRef = collection(chatroomDocRef, 'messages');
  const handleLongPress = () => {
    Keyboard.dismiss(); // Dismiss the keyboard when long press occurs
  };

  useEffect(() => {
    async function initializeChatroom() {
      const chatroomDocSnapshot = await getDoc(chatroomDocRef);

      if (!chatroomDocSnapshot.exists()) {
        await setDoc(chatroomDocRef);

        const messagesCollectionRef = collection(chatroomDocRef, 'messages');
        await addDoc(messagesCollectionRef, {
          text: 'You are matched with another user. Please follow the Jiltd guidelines',
          timestamp: Timestamp.now(),
          senderId: 'system',
        });
      }
      const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          _id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().timestamp.toMillis(),
          user: { _id: doc.data().senderId },
        }));
        const sortedMessages = messageData.slice().sort((a, b) => a.createdAt - b.createdAt);
        const reversedMessages = sortedMessages.reverse();


        setMessages(reversedMessages);
      
      });

      return () => {
        unsubscribe();
      };
    }

    initializeChatroom();
  }, []);

  const onSend = async (newMessages = []) => {
    if (newMessages.length === 0) return;

    const messageData = {
      text: newMessages[0].text,
      timestamp: Timestamp.fromMillis(newMessages[0].createdAt),
      senderId: user1Id,
    };

    await addDoc(messagesRef, messageData);
  };
 //this will change lol
  const renderKeyboardComponent = () => {
      return (

          <GiftedChat
            messages={messages}
            onSend={onSend}
            user={{ _id: user1Id }}
          />
       );

  };
  return (
    <View style={styles.chatroomContainer}>
    {renderKeyboardComponent()}
  </View>
  );
};

export default ChatroomComponent;
