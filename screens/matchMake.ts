import {deleteDoc, setDoc, getDoc, CollectionReference, QuerySnapshot, DocumentData, DocumentReference, DocumentSnapshot, QueryDocumentSnapshot, db,doc, getDocs, collection, runTransaction} from '../firebase';
import type {RootStackParamList} from '../App';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const matchMake = async (
clientUserID: string,
navigation: NativeStackNavigationProp<RootStackParamList>
) => {
  let inQueue = true;
  let finalMatchID: string = "MATCH" 
  let start = Date.now();
  while (inQueue){
    let delta = Date.now() - start;
    if (delta > 12000){
      break;
    }
    const clientUserDocRef: DocumentReference<DocumentData, DocumentData> = doc(db,'queue',clientUserID);
    const clientUserDocSnap: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(clientUserDocRef);
    if (!clientUserDocSnap.exists()){
      await setDoc(clientUserDocRef, {
        matchedID: "Open"
      })
    }
  
    
    let matchedUser: QueryDocumentSnapshot<DocumentData, DocumentData>; 
    try 
    {
      finalMatchID = await runTransaction(db, async (transaction) => {
        const matchMakingPoolRef: CollectionReference<DocumentData, DocumentData> = collection(db, "queue");
        const matchMakingPoolSnap: QuerySnapshot<DocumentData, DocumentData> = await getDocs(matchMakingPoolRef);
        const clientUserDocSnap = await transaction.get(clientUserDocRef);
        const clientUserMatchedID = clientUserDocSnap.data()?.matchedID ?? "Open";
        if (clientUserMatchedID !== "Open"){
          inQueue = false;
          return clientUserMatchedID;
        }
        for (const doc of matchMakingPoolSnap.docs) 
        {
          const curUser = await transaction.get(doc.ref); 
          if (!curUser.exists()) 
          {
            throw "Document does not exist!";
          }
          console.log(curUser.id)
          if (curUser.exists() && curUser.id !== clientUserID && curUser.id !== "emptyQ") 
          { 
            matchedUser = curUser;
            break;
          }
        }
        if (!matchedUser)
        {
          inQueue = true;
          throw "Queue is empty! Nobody's home."
        }

        const writetoMatch = clientUserID;
        transaction.update(matchedUser.ref, { matchedID: writetoMatch});
        const matchedUserID = matchedUser.id
        return matchedUserID
      });
      } 
    catch (e) 
    {
      console.log(e);
    }

    try
    {
      if (typeof finalMatchID === 'undefined')
      {
        throw "Undefined!";
      }
      if (finalMatchID === "MATCH")
      {
        throw "Can't find a single valid match!";
      }
      inQueue = false;
      const clientUserDocRefCheck: DocumentReference<DocumentData, DocumentData> = doc(db,'queue',clientUserID);
      const clientUserDocSnapCheck: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(clientUserDocRefCheck);
      if (clientUserDocSnapCheck.exists())
      {
        await deleteDoc(clientUserDocRefCheck);
        console.log("LEFT QUEUE");
      }
      console.log(finalMatchID, clientUserID)
      navigation.navigate("MatchScreen", { match: finalMatchID, self: clientUserID})
    }
    catch(e)
    {
      console.log(e);
    }
  }
  const clientUserDocRefCheck: DocumentReference<DocumentData, DocumentData> = doc(db,'queue',clientUserID);
  const clientUserDocSnapCheck: DocumentSnapshot<DocumentData, DocumentData> = await getDoc(clientUserDocRefCheck);
  if (clientUserDocSnapCheck.exists())
  {
    await deleteDoc(clientUserDocRefCheck);
    console.log("LEFT QUEUE");
  }
  }

