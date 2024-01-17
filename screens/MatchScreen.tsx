import styles from '../essentialComponents/Style';
import type { RootStackParamList } from '../App';
import {doc, db, runTransaction, onSnapshot } from '../firebase'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, RouteProp, useNavigation, useRoute  } from '@react-navigation/native';
import { Text, View,  SafeAreaView, TouchableOpacity, Platform} from 'react-native';
import ChatroomComponent from '../essentialComponents/ChatroomComponent';
import FlashButton from '../essentialComponents/FlashButton';
//add a listener that listens to clientusersdoc
//unsubscribes and navigates to the Jilt screen if

//back
//writes to the person you matched with
//turns their chat to ofalse
//does the same for you too

type MatchScreenRouteProp = RouteProp<RootStackParamList, "MatchScreen">
interface Props{
  route?: MatchScreenRouteProp;
}

const MatchScreen: React.FC<Props> = (props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const matched = props.route.params.match;
    const me = props.route.params.self;
    const buttonContainerWidth = Platform.OS === 'web' ? '15%' : '40%';
    const clientUserDocRef = doc(db,'users', me);
    const matchUserDocRef = doc(db,'users', matched);

    const unsubscribe = onSnapshot(clientUserDocRef, (doc) => {
      console.log(doc.data())
      if (doc.data().jilt === true)
      {
        unsubscribe();
        navigation.navigate("RatingScreen", {ratee: matched })  
      }
    });
    const handleJilt = async () => {
      try
      {
        await runTransaction(db, async (transaction) => {
          //const myDoc = await transaction.get(clientUserDocRef);
          //const theirDoc = await transaction.get(matchUserDocRef)
          transaction.update(matchUserDocRef, {jilt:true})
          transaction.update(clientUserDocRef, {jilt:true})
          unsubscribe();


        }) }
        catch (e) {
          console.log("Failed!", e);
        }
        //navigate to the rating page
        navigation.navigate("RatingScreen", {ratee: matched })    
      }
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
