import {View, FlatList, Text, TextInput, KeyboardAvoidingView, Image } from "react-native"
import {doc, collection, db, getDoc, query, onSnapshot, orderBy, addDoc, Timestamp, setDoc} from '../firebase'
import { useState, useEffect, useRef} from "react";
import FlashButton from "./FlashButton";
import styles from "./Style";

/**
 * JiltdChat.tsx
 * An inverted flatlist that renders an array of message objects
 * message.senderID decides if the message is on the left or right, and its color
 * message.text contains the message
 * message.timestamp contains a timestamp object
 * 
 */

const JiltdChat = ({ client_ID, match_ID }) => {
  //var updatedMessages = []
  var updatedMessages = []
  const [sampleSend, setSample] = useState('');
  const textInputRef = useRef(null);
  const smallerUserId = client_ID < match_ID ? client_ID : match_ID;
  const largerUserId = client_ID < match_ID ? match_ID : client_ID;
  const chatroomDocRef = doc(db, 'chatrooms', `${smallerUserId}_${largerUserId}`);
  const messagesRef = collection(chatroomDocRef, 'messages');

    const [messages, setMessages] = useState([]);
    const sampleData = [{message: "Hey", sender : true, key: "unique1"}, {message: "Hey back", sender: false, key: "unique2"}]
    const sendMessage = async () => {
      const tsObject = Timestamp.now();
      await addDoc(messagesRef, {
        text: 'beezlebub',
        timestamp: tsObject,
        senderId: 'system',
        millisecond: tsObject.toMillis(),
        realTime: tsObject.toDate()
      });

    }
    const testInput = async () => {
      const tsObject = Timestamp.now();
      if (sampleSend !== '') {
        textInputRef.current.clear();
        await addDoc(messagesRef, {
          text: sampleSend,
          timestamp: tsObject,
          senderId: client_ID,
          millisecond: tsObject.toMillis(),
          realTime: tsObject.toDate()
        });
        setSample('');
        
      }


    }
    const clientTest = async () => {
      const tsObject = Timestamp.now();

      await addDoc(messagesRef, {
        text: sampleSend,
        timestamp: tsObject,
        senderId: match_ID,
        millisecond: tsObject.toMillis(),
        realTime: tsObject.toDate()
      });

    }

    useEffect(() => {
      console.log("Updated messages:", messages);
    }, [messages]);
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
          }
    
          const q = query(messagesRef, orderBy("millisecond", "desc"));
          const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log("LISTENER ACTIVE")
 // Create a copy of the current messages
            
            const newMessages = snapshot.docs.map(doc => doc.data());
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
  return (
    <KeyboardAvoidingView
    style={[{flex:1}, styles.primaryBGoffBlack]}
    behavior="padding"
  >
  <View style = {{flex:1, flexDirection: "column"}}>


<View style = {[{ flex: 1}]}>
  <FlatList data = {messages} inverted = {true}  renderItem={({item}) => 
(<View style = {[item.senderId === client_ID ? styles.rightBubble : styles.leftBubble]} key={item.key}>
  <View style = {[item.senderId === client_ID ?styles.chatTextR : styles.chatTextL]}> 
  <Text style = {[item.senderId === client_ID ? styles.rightText : styles.leftText, {fontWeight: '600', color: 'white'}]}> 
  {item.text}</Text></View>
  <Text style = {[styles.size5, {textAlign: 'center', fontWeight: '800', color:'white'}]}> 
  {item.realTime.toDate().toLocaleDateString()}
{"   "} 
  {item.realTime.toDate().toLocaleTimeString()}</Text>
  </View>)}
  />
  
  </View>

<View style = {[{flex:0.4 , backgroundColor: 'rgba(7, 7, 7, .2)'} ]}>
<View style={[{flexDirection:'row', flex:1, padding: 15}, { justifyContent: 'space-between', alignItems: 'center'}]}>

<TextInput      ref={textInputRef}
                placeholder = "say something"
                placeholderTextColor = "white"
                value = {sampleSend}
                onChangeText ={text => setSample(text)}
                style={[styles.input, {flex:.60, borderRadius: 30}]}
            />

  <View style = {{flex:.2}}>
  <FlashButton pressFunc={testInput} text={"s"} ></FlashButton>
  <FlashButton pressFunc={clientTest} text={"r"} ></FlashButton>
  </View>

</View>

</View>

  </View>
  </KeyboardAvoidingView>)
}
export default JiltdChat