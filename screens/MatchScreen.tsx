import styles from '../essentialComponents/Style';
import type { RootStackParamList } from '../App';
import {doc, db, runTransaction, onSnapshot, updateDoc, increment, deleteDoc } from '../firebase'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, RouteProp, useNavigation, useRoute  } from '@react-navigation/native';
import { Text, View,  SafeAreaView, TouchableOpacity, Platform} from 'react-native';
import ChatroomComponent from '../essentialComponents/ChatroomComponent';
import FlashButton from '../essentialComponents/FlashButton';
import { useEffect } from 'react';
//add a listener that listens to clientusersdoc
//unsubscribes and navigates to the Jilt screen if

//back
//writes to the person you matched with
//turns their chat to ofalse
//does the same for you too

//add a listenr that listens to the chatroom itself
//Each player increments the joinfield
//as soon as its 2, we remove client from the queue and unsubscribe!

type MatchScreenRouteProp = RouteProp<RootStackParamList, "MatchScreen">
interface Props{
  route?: MatchScreenRouteProp;
}

const MatchScreen: React.FC<Props> = (props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const matched = props.route.params.match;
    const me = props.route.params.self;
    // const smallerUserId = me < matched ? me : matched;
    // const largerUserId = me < matched ? matched : me;
    // const chatroomDocRef = doc(db, 'chatrooms', `${smallerUserId}_${largerUserId}`);
    const buttonContainerWidth = Platform.OS === 'web' ? '15%' : '40%';
    const clientUserDocRef = doc(db,'users', me);
    const matchUserDocRef = doc(db,'users', matched);
    const clientUserQueueDoc = doc(db,'queue', me);
    //update client doc in users collection matchedID by matched
  // const joinedChat = async () => {await updateDoc(chatroomDocRef, {inside: increment(1)}) }
  //create listener for match doc
  //if their inside 1, delete our doc and unsubscribe
  const removeDoc = async () => {
    await deleteDoc(clientUserQueueDoc); 
  }

  //I WRITE TO THEM
  const confirmMatch = async () => {
    await updateDoc(matchUserDocRef, {matchedID: me})
  }
  //check if THEY WROTE TO ME
  const leaveQueue = 
    onSnapshot(clientUserDocRef, (doc) => {
      if (doc.data().matchedID === matched){
        console.log( "dELETING DOC", "MYID:", me, "What is written:", doc.data().matchedID)
        removeDoc();
        leaveQueue();
        
      }});
    // if the matched user presses the button
    const leaveChat = onSnapshot(clientUserDocRef, (doc) => {
      console.log(doc.data())
      if (doc.data().jilt === true)
      {
        leaveChat();
        navigation.navigate("RatingScreen", {ratee: matched })  
      }
    });
    //if the client presses the button
    const handleJilt = async () => {
      try
      {
        await runTransaction(db, async (transaction) => {
          //const myDoc = await transaction.get(clientUserDocRef);
          //const theirDoc = await transaction.get(matchUserDocRef)
          transaction.update(matchUserDocRef, {jilt:true})
          transaction.update(clientUserDocRef, {jilt:true})
          leaveChat();


        }) }
        catch (e) {
          console.log("Failed!", e);
        }
        //navigate to the rating page
        navigation.navigate("RatingScreen", {ratee: matched })    
      }

      useEffect(()=>{
        confirmMatch();
      }, []);
    return (
        <SafeAreaView style={styles.matchContainer}>
          <View style={[styles.buttonContainer, {width: buttonContainerWidth}]}>
                <FlashButton pressFunc={handleJilt} text={"JILT"} ></FlashButton>
          </View>
            <Text>{matched}TEST</Text>
            <Text>{me}TESTE</Text>
            <View style={styles.chatroomContainer}>
              <ChatroomComponent user1Id={me} user2Id={matched} />
              
            </View>
          </SafeAreaView>

    )
};
export default MatchScreen
