// @ts-nocheck
import { CollectionReference, QuerySnapshot } from 'firebase/firestore';
import {DocumentData, DocumentReference, DocumentSnapshot, QueryDocumentSnapshot, Transaction, db,doc, getDocs, collection, runTransaction} from '../../firebase';
import type {RootStackParamList} from '../nav.ts';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
  
export const matchMake = async (
userID: string,
setJoin: Function,
joinVal: string,
navigation: NativeStackNavigationProp<RootStackParamList>
) => {
  const clientUserDocRef: DocumentReference<DocumentData, DocumentData> = doc(db,'users',userID);
  try
  {
    const joinOrMatch: string = await runTransaction(db, async (transaction: Transaction): Promise<string> => { 
      const clientUserDocSnap: DocumentSnapshot<DocumentData, DocumentData> = await transaction.get(clientUserDocRef);
      if (!clientUserDocSnap.exists()) 
      {
        throw "Document does not exist!";
      }
      const local_matchedID: string = clientUserDocSnap.data().matchedID;
      if (local_matchedID === "None")
      {
        transaction.update(clientUserDocRef, {looking: true});
      }
      return local_matchedID})

    setJoin(joinOrMatch)
  }
  catch (e) 
  {
    console.error(e)
  }


  if (joinVal != "None")
  {
    navigation.navigate("MatchScreen", {match: joinVal, user: userID})
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
        if (curUser.id !== userID) 
        { // + && user matchmevalue is blank
          matchedUser = doc
          break;
        }
      }
        
      const local_matchedID = clientUserDocSnap.data()?.matchedID ?? "Undefined";
      const newID = userID;
      transaction.update(matchedUser.ref, { matchedID: newID, looking: false});
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
    navigation.navigate("MatchScreen", { match: returnVal, user: userID})
  }

  }
