import {View, FlatList, Text, TextInput, KeyboardAvoidingView } from "react-native"
import {doc, collection, db, getDoc, query, onSnapshot, orderBy, addDoc, Timestamp, setDoc} from '../firebase'
import { useState, useEffect} from "react";
import FlashButton from "./FlashButton";
import styles from "./Style";
import CustomKeyboardWrapper from "../conditionalComponents/CustomKeyboardWrapper";
// <View style={item.sender ? styles.left : styles.right}>
// item.sender === CONSTANT_STRING ? styles.left : styles.right or item.ID
//system or match_ID is on left and an offshade of the background black
//client is on right and jiltd red
const JiltdChat = ({ client_ID, match_ID }) => {
  //var updatedMessages = []
  var updatedMessages = []
  const [sampleSend, setSample] = useState('');
  const smallerUserId = client_ID < match_ID ? client_ID : match_ID;
  const largerUserId = client_ID < match_ID ? match_ID : client_ID;
  const chatroomDocRef = doc(db, 'chatrooms', `${smallerUserId}_${largerUserId}`);
  const messagesRef = collection(chatroomDocRef, 'messages');

    const [messages, setMessages] = useState([]);
    const sampleData = [{message: "Hey", sender : true, key: "unique1"}, {message: "Hey back", sender: false, key: "unique2"}]
    const sendMessage = async () => {
      await addDoc(messagesRef, {
        text: 'beezlebub',
        timestamp: Timestamp.now(),
        senderId: 'system',
        millisecond: Timestamp.now().toMillis()
      });

    }
    const testInput = async () => {

      await addDoc(messagesRef, {
        text: sampleSend,
        timestamp: Timestamp.now(),
        senderId: 'system',
        millisecond: Timestamp.now().toMillis()
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
    style={{flex:1}}
    behavior="padding"
  >
  <View style = {{flex:1, flexDirection: "column"}}>
    <View style = {{flex: .25}}><FlashButton pressFunc={sendMessage} text={"x"} ></FlashButton>
    <FlashButton pressFunc={sendMessage} text={"x"} ></FlashButton></View>

<View style = {[{ flex: 1}]}><FlatList data = {messages} inverted = {true} renderItem={({item}) => (<View style = {{justifyContent:"flex-end"}} key={item.key}><Text style = {{textAlign: "right", color:"black"}}> {item.millisecond}{item.text} </Text></View>)}/></View>

<View style = {{flex: .40}}>
<TextInput
                placeholder = "say something"
                placeholderTextColor = "white"
                value = {sampleSend}
                onChangeText ={text => setSample(text)}
                style={styles.input}
            />
  
  <FlashButton pressFunc={testInput} text={"x"} ></FlashButton>

</View>

  </View>
  </KeyboardAvoidingView>)
}
export default JiltdChat