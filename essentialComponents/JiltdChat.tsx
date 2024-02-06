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

      await addDoc(messagesRef, {
        text: sampleSend,
        timestamp: tsObject,
        senderId: client_ID,
        millisecond: tsObject.toMillis(),
        realTime: tsObject.toDate()
      });

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
    style={{flex:1, backgroundColor:"#1c1c1c"}}
    behavior="padding"
  >
  <View style = {{flex:1, flexDirection: "column"}}>
    <View style = {{flex: .25}}><FlashButton pressFunc={sendMessage} text={"x"} ></FlashButton>
</View>

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

<View style = {{flex: .40}}>
<TextInput
                placeholder = "say something"
                placeholderTextColor = "white"
                value = {sampleSend}
                onChangeText ={text => setSample(text)}
                style={styles.input}
            />
  
  <FlashButton pressFunc={testInput} text={"s"} ></FlashButton>
  <FlashButton pressFunc={clientTest} text={"r"} ></FlashButton>


</View>

  </View>
  </KeyboardAvoidingView>)
}
export default JiltdChat