import styles from '../essentialComponents/Style';
import type { RootStackParamList } from '../App';
import {doc, db, runTransaction, onSnapshot, updateDoc, increment, deleteDoc } from '../firebase'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, RouteProp, useNavigation, useRoute  } from '@react-navigation/native';
import { Text, View,  SafeAreaView, TouchableOpacity, Platform} from 'react-native';
import ChatroomComponent from '../essentialComponents/ChatroomComponent';
import JiltdChat from '../essentialComponents/JiltdChat';
import FlashButton from '../essentialComponents/FlashButton';
import { useEffect } from 'react';
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
  // const joinedChat = async () => {await updateDoc(chatroomDocRef, {inside: increment(1)}) }
  const removeDoc = async () => {
    await deleteDoc(clientUserQueueDoc); 
  }
  const confirmMatch = async () => {
    await updateDoc(matchUserDocRef, {matchedID: me});
  }
  const cleanUp = async () => {
    await updateDoc(clientUserDocRef, {matchedID: "None"});
  }

  // listeners should be defined inside useEffect

// - Call those cleanup fucntions in the parts of the code where I want users to still be in the app but no longer listening to data
// - and also call it as a return of useeffect just to ENSURE that they are unsubscribed when the component is no longer mounted
  const leaveQueue = 
    onSnapshot(clientUserDocRef, (doc) => {
      if (doc.data().matchedID === matched){
        removeDoc();
        leaveQueue();
        cleanUp();
        
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
        //then place listeners
      }, []);
    return (
        <SafeAreaView style={styles.matchContainer}>
          <View style={[styles.buttonContainer, {width: buttonContainerWidth}]}>
                <FlashButton pressFunc={handleJilt} text={"JILT"} ></FlashButton>
          </View>
            <Text>{matched}TEST</Text>
            <Text>{me}TESTE</Text>
            
              <JiltdChat client_ID={me} match_ID={matched} />
              
              
            
          </SafeAreaView>

    )
};
export default MatchScreen
