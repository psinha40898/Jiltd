import React, { useState } from 'react';
import { useNavigation, useRoute  } from '@react-navigation/native';
import { Text, View, Image, Button, StyleSheet, KeyboardAvoidingView, SafeAreaView, TouchableOpacity, Platform} from 'react-native';
import {db,doc, signOut, setDoc, auth, storage, ref, uploadBytes, getDownloadURL, getDocs, collection, runTransaction} from '../firebase'; 
export async function matchMake (){
    //todo: REFACTOR THE ITERATE FUNCTION HERE!
const navigation = useNavigation(userID)
let returnVal = ""
//First transaction
//Check matchedID and set looking flag to True if it is None
//otherwise pass it as data to match later
//transaction.get our user document to get a Documentsnapshot
//.get<field> for matchedID
//if None, do write
//return false condition (procceed to join queue)
//else return true condition
//the tranasaction itself returns the matchedID (proceed to match with who wrote to you)

//1)
//Checks if anyone has written to the client user's matchedID
//If not: set looking flag to true
//return matchedID
//if return is None, proceed with match
//Otherwise attempt matching with return value
const docRef = doc(db,'users',userID);
try
{
 const joinOrMatch = await runTransaction(db, async (transaction) => {
  const docSnapshot = await transaction.get(docRef);
  if (!docSnapshot.exists()) {
    throw "Document does not exist!";
  }
  const local_matchedID = docSnapshot.data().matchedID;
  if (local_matchedID === "None")
  {
    transaction.update(docRef, {looking: true});
  }
  return local_matchedID
  

  })
  console.log(joinOrMatch);
  setJoin(joinOrMatch)

}
catch (e) {
  console.error(e)
}

//depending on value of joinOrMatch we return or continue onto the next transaction
//2)
//Currently, iterates through every document
//Writes to the last one in the iteration
//-->
//Make it iterate and write to the matched one

if (joinVal === "None"){
var finalWrite = "" 
try {
  returnVal = await runTransaction(db, async (transaction) => {
    const usersCollection = collection(db, "users");
    const querySnapshot = await getDocs(usersCollection);
    const docSnapshot = await transaction.get(docRef);

    for (const doc of querySnapshot.docs) {
      const curDoc = await transaction.get(doc.ref); //read
      if (!curDoc.exists) {
        throw "Document does not exist!";
      }
      console.log(curDoc.id)
      // if match conditions, then finalWrite = doc and break
      // if user matchmevalue is blank proceed to matchmake, otherwise return that val
      if (curDoc.id !== userID) { // + && user matchmevalue is blank
        finalWrite = doc
        break;
      }
       //should be in if match clause and create a break
    }
   
    const local_matchedID = docSnapshot.data().matchedID;
    //const newEmail = finalWrite.data().matchedID + "write"; //currently pointing at the last doc iteration
    const newID = userID;
    transaction.update(finalWrite.ref, { matchedID: newID, looking: false});
    const temp = finalWrite.id
    if (local_matchedID === "None")
    {
      transaction.update(docRef, {looking: false});
    }
    console.log(temp);
    return temp;

  });
} catch (e) {
  console.log("Failed", e);
}
// setUser2(returnVal);
if (returnVal !== ""){
  navigation.navigate("MatchScreen", { match: returnVal, user: userID})
}
}
else
{
navigation.navigate("MatchScreen", {match: joinVal, user: userID})
}
}