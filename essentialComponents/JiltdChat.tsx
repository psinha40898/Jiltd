import { FlatList } from "react-native"
import {doc, collection, db, getDoc, query, onSnapshot, orderBy} from '../firebase'
import { useState, useEffect} from "react";
// <View style={item.sender ? styles.left : styles.right}>
// item.sender === CONSTANT_STRING ? styles.left : styles.right or item.ID
const ChatroomComponent = ({ client_ID, match_ID }) => {
  var updatedMessages = []
  const smallerUserId = client_ID < match_ID ? client_ID : match_ID;
  const largerUserId = client_ID < match_ID ? match_ID : client_ID;
  const chatroomDocRef = doc(db, 'chatrooms', `${smallerUserId}_${largerUserId}`);
  const messagesRef = collection(chatroomDocRef, 'messages');

    const [messages, setMessages] = useState([]);
    const sampleData = [{message: "Hey", sender : true, key: "unique1"}, {message: "Hey back", sender: false, key: "unique2"}]
    const sendMessage = () => {
        // Adds a doc to the collection
    }

    //useEffect
    // create ref to collection
    // create snap
    // if doesnt exist, add default msg doc
    // create query and orderBy creationdate
    // listen to query
    // fordocChanges in query, 
    // the first time, it should query every doc
    // I think we have to go through the entire array every time ? unless we use a double ended queue instead of an arary?
    // changes should be most recent
    //The only thing the query should be doing is reversing the order.


    //or
    //listen to query
    //for dochcanges in query
    //add the changes to a cScope array
    //set state array to cScope array
    // First time it will copy the entire query into the array
    // Next times it will add the new messages to the component scoped array
    // Then it will set that array to state
    // It will be reversed before rendering.

    // Better than going through entire collection, sorting it, and reversing it, on every render
    // Now we go through the entire collection once, only go through new additions subsequently, and  reverse it on every render, 

    useEffect(()=> 
    {
      async function intializeChat() {
        const chatroomDocSnapshot = await getDoc(chatroomDocRef);
        if(!chatroomDocSnapshot.exists())
        {
          //add default message doc
        }
        const q = query(messagesRef, orderBy("creationDate", "desc"))
        const unsubscribe = onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach( (change) => {
            if (change.type === "added") {
              updatedMessages.push(change)
            }
          })
          setMessages(updatedMessages);
        })
        //create query order by
        //listen to query
        //forDocChanges in query
        //push or copy changes to a component scoped array
        //set state array to the component scoped array

      }
  return () => {intializeChat()}
  
  
  
  
  
  
  }, [])

    // const q = query(collection(db, "cities"), where("state", "==", "CA"));
    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //     if (change.type === "added") {
    //         console.log("New city: ", change.doc.data());
    //     }
    //     if (change.type === "modified") {
    //         console.log("Modified city: ", change.doc.data());
    //     }
    //     if (change.type === "removed") {
    //         console.log("Removed city: ", change.doc.data());
    //     }
    //   });
    // });



  // return (<FlatList></FlatList>)
  return (<div></div>)
}