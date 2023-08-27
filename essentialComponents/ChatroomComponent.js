import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { doc, db, collection, onSnapshot, addDoc, Timestamp, getDoc, setDoc } from '../firebase'; // Adjust the path and imports based on your project structure

const ChatroomComponent = ({ user1Id, user2Id }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const smallerUserId = user1Id < user2Id ? user1Id : user2Id;
  const largerUserId = user1Id < user2Id ? user2Id : user1Id;

  const chatroomDocRef = doc(db, 'chatrooms', `${smallerUserId}_${largerUserId}`);
  const messagesRef = collection(chatroomDocRef, 'messages');

  useEffect(() => {
    async function initializeChatroom() {
      const chatroomDocSnapshot = await getDoc(chatroomDocRef);

      if (!chatroomDocSnapshot.exists()) {
        // Create the chatroom document
        await setDoc(chatroomDocRef, {});

        // Create the 'messages' subcollection
        const messagesCollectionRef = collection(chatroomDocRef, 'messages');
        // Add a dummy message if needed
        await addDoc(messagesCollectionRef, {
          text: 'You are matched with another user. Please follow the Jiltd guidelines',
          timestamp: Timestamp.now(),
          senderId: 'system',
        });
      }

      const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
        const messageData = snapshot.docs.map((doc) => doc.data());
        setMessages(messageData);
      });

      return () => {
        unsubscribe();
      };
    }

    initializeChatroom();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      text: newMessage,
      timestamp: Timestamp.now(),
      senderId: user1Id,
    };

    await addDoc(messagesRef, messageData);

    setNewMessage('');
  };

  const sortedMessages = messages.slice().sort((a, b) => a.timestamp - b.timestamp);

  return (
    <View style={styles.chatContainer}>
      <ScrollView
        contentContainerStyle={styles.chatMessagesContainer}
        inverted
      >
        {sortedMessages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.chatMessage,
              message.senderId === user1Id ? styles.senderMessage : styles.receiverMessage,
            ]}
          >
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setNewMessage(text)}
          value={newMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
  },
  chatMessagesContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
  },
  chatMessage: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  senderMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#D3EED6',
  },
  receiverMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#F0F0F0',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5,
  },
  sendButton: {
    alignSelf: 'flex-end',
    margin: 10,
  },
});

export default ChatroomComponent;
