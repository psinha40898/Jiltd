// @ts-nocheck
import { CollectionReference, QuerySnapshot } from 'firebase/firestore';
import {DocumentData, DocumentReference, DocumentSnapshot, QueryDocumentSnapshot, Transaction, db,doc, getDocs, collection, runTransaction} from '../../firebase';
import type {RootStackParamList} from '../nav.ts';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
  
export const matchMake = async (
clientUserID: string,
setMatch: Function,
matchedID_state: string,
navigation: NativeStackNavigationProp<RootStackParamList>
) => {
  const clientUserDocRef: DocumentReference<DocumentData, DocumentData> = doc(db,'users',clientUserID);
  try
  {
    const matchedUserID: string = await runTransaction(db, async (transaction: Transaction): Promise<string> => { 
      const clientUserDocSnap: DocumentSnapshot<DocumentData, DocumentData> = await transaction.get(clientUserDocRef);
      if (!clientUserDocSnap.exists()) 
      {
        throw "Document does not exist!";
      }
      const local_matchedUserID: string = clientUserDocSnap.data().matchedID;
      if (local_matchedUserID === "None")
      {
        transaction.update(clientUserDocRef, {looking: true});
      }
      return local_matchedUserID})

    setMatch(matchedUserID)
  }
  catch (e) 
  {
    console.error(e)
  }


  if (matchedID_state != "None")
  {
    navigation.navigate("MatchScreen", {match: matchedID_state, user: clientUserID})
    return
  }

  let returnVal: string = "" 
  let matchedUser: QueryDocumentSnapshot<DocumentData, DocumentData>; 
  try 
  {
    returnVal = await runTransaction(db, async (transaction) => {
      const matchMakingPoolRef: CollectionReference<DocumentData, DocumentData> = collection(db, "users");
      const matchMakingPoolSnap: QuerySnapshot<DocumentData, DocumentData> = await getDocs(matchMakingPoolRef);
      const clientUserDocSnap = await transaction.get(clientUserDocRef);

      for (const doc of matchMakingPoolSnap.docs) 
      {
        const curUser = await transaction.get(doc.ref); //read
        if (!curUser.exists) 
        {
          throw "Document does not exist!";
        }
        console.log(curUser.id)
        if (curUser.id !== clientUserID) 
        { // + && user matchmevalue is blank
          matchedUser = doc
          break;
        }
      }
        
      const local_matchedID = clientUserDocSnap.data()?.matchedID ?? "Undefined";
      const writetoMatch = clientUserID;
      transaction.update(matchedUser.ref, { matchedID: writetoMatch, looking: false});
      const temp = matchedUser.id
      if (local_matchedID === "None")
      {
        transaction.update(clientUserDocRef, {looking: false});
      }
      console.log(temp);
      return temp;
    });
    } 
  catch (e) 
  {
    console.log("Failed", e);
  }
  if (returnVal !== "")
  {
    navigation.navigate("MatchScreen", { match: returnVal, user: clientUserID})
  }

  }
