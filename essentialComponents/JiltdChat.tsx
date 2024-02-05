import {View, FlatList, Text } from "react-native"
import {doc, collection, db, getDoc, query, onSnapshot, orderBy, addDoc, Timestamp, setDoc} from '../firebase'
import { useState, useEffect} from "react";
import FlashButton from "./FlashButton";
// <View style={item.sender ? styles.left : styles.right}>
// item.sender === CONSTANT_STRING ? styles.left : styles.right or item.ID
const JiltdChat = ({ client_ID, match_ID }) => {
  var updatedMessages = []
  var unsubscribe
  const smallerUserId = client_ID < match_ID ? client_ID : match_ID;
  const largerUserId = client_ID < match_ID ? match_ID : client_ID;
  const chatroomDocRef = doc(db, 'chatrooms', `${smallerUserId}_${largerUserId}`);
  const messagesRef = collection(chatroomDocRef, 'messages');

    const [messages, setMessages] = useState([]);
    const sampleData = [{message: "Hey", sender : true, key: "unique1"}, {message: "Hey back", sender: false, key: "unique2"}]
    const sendMessage = async () => {
      await addDoc(messagesRef, {
        text: 'XXXXXXXXXXXXXXX',
        timestamp: Timestamp.now(),
        senderId: 'system',
        millisecond: Timestamp.now().toMillis()
      });
      console.log(messages);
    }

    useEffect(() => {
      async function initializeChat() {
        try {
          const chatroomDocSnapshot = await getDoc(chatroomDocRef);
          if (!chatroomDocSnapshot.exists()) {
            await addDoc(messagesRef, {
              text: 'You are matched with another user. Please follow the Jiltd guidelines',
              timestamp: Timestamp.now(),
              senderId: 'system',
              millisecond: Timestamp.now().toMillis()
            });
          } else {
            console.log("Executing");
            await addDoc(messagesRef, {
              text: 'Test',
              timestamp: Timestamp.now(),
              senderId: 'system',
              millisecond: Timestamp.now().toMillis()
            });
          }
    
          const q = query(messagesRef, orderBy("millisecond"));
          console.log(q);
          const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log("LISTENER ACTIVE")
            const newMessages = [...messages]; // Create a copy of the current messages
            snapshot.forEach((change) => {
              console.log("CHANGES OBSERVED")
              newMessages.push(change.data());

            });
            setMessages(newMessages);
          });
    
          return () => {
            if (unsubscribe) {
              console.log("Returning unsubscribe");
              unsubscribe();
            }
          };
        } catch (error) {
          console.error("Error initializing chat:", error);
        }
      }
    
      initializeChat();
      console.log("Test");
    
    }, []);


  // return (<FlatList></FlatList>)
  return (<View>
    <FlashButton pressFunc={sendMessage} text={"srs"} ></FlashButton>

<FlatList data = {messages} renderItem={({item}) => (<Text> {item.millisecond} </Text>)}>

  
</FlatList>

  </View>)
}
export default JiltdChat