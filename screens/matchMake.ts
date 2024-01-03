import {deleteDoc, setDoc, getDoc, CollectionReference, QuerySnapshot, DocumentData, DocumentReference, DocumentSnapshot, QueryDocumentSnapshot, db,doc, getDocs, collection, runTransaction} from '../firebase';
import type {RootStackParamList} from '../App';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const matchMake = async (
clientUserID: string,
navigation: NativeStackNavigationProp<RootStackParamList>
) => {
  const clientUserDocRef: DocumentReference<DocumentData, DocumentData> = doc(db,'queue',clientUserID);
  const clientUserDocSnap: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(clientUserDocRef);
  if (!clientUserDocSnap.exists()){
    await setDoc(clientUserDocRef, {
      matchedID: "Open"
    })
  }
  
  let finalMatchID: string = "" 
  let matchedUser: QueryDocumentSnapshot<DocumentData, DocumentData>; 
  try 
  {
    finalMatchID = await runTransaction(db, async (transaction) => {
      const matchMakingPoolRef: CollectionReference<DocumentData, DocumentData> = collection(db, "queue");
      const matchMakingPoolSnap: QuerySnapshot<DocumentData, DocumentData> = await getDocs(matchMakingPoolRef);
      const clientUserDocSnap = await transaction.get(clientUserDocRef);
      const clientUserMatchedID = clientUserDocSnap.data()?.matchedID ?? "Open";
      if (clientUserMatchedID !== "Open"){
        return clientUserMatchedID;
      }

      for (const doc of matchMakingPoolSnap.docs) 
      {
        const curUser = await transaction.get(doc.ref); 
        if (!curUser.exists) 
        {
          throw "Document does not exist!";
        }
        console.log(curUser.id)
        if (curUser.id !== clientUserID) 
        { 
          matchedUser = doc
          break;
        }
      }

      const writetoMatch = clientUserID;
      transaction.update(matchedUser.ref, { matchedID: writetoMatch});
      const matchedUserID = matchedUser.id
      return matchedUserID
    });
    } 
  catch (e) 
  {
    console.log("Failed", e);
  }
  const clientUserDocRefCheck: DocumentReference<DocumentData, DocumentData> = doc(db,'queue',clientUserID);
  const clientUserDocSnapCheck: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(clientUserDocRefCheck);
  if (clientUserDocSnapCheck.exists())
  {
    await deleteDoc(clientUserDocRef);
    console.log("DELETE");
  }

  if (finalMatchID !== "")
  {
    navigation.navigate("MatchScreen", { match: finalMatchID, self: clientUserID})
  }
  }
