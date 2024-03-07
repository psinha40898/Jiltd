import React, {useEffect, useState} from 'react';
import {Text, Button, StyleSheet, View, Image, Modal, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../App';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../essentialComponents/Style';
import FlashButton from '../essentialComponents/FlashButton';
import IconButton from '../essentialComponents/Icon';
import LoopAnimation from '../essentialComponents/LoopAnimation';
import { matchMake } from './matchMake';
import { auth, ref, storage, getDownloadURL, doc, getDoc, db} from '../firebase';
import Dropdown from 'react-native-input-select';
import SelectDropdown from 'react-native-select-dropdown'

// syntax
// <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />

const Test = () => {
  const userID = auth.currentUser.uid;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [displayImage, setImage] = useState(null);
  const [curPath, setPath] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [countries, setInventory] = useState([]);
  //need to load this array from the database
  //this should load from users/userid.data().inventory
  //either all the keys or the keys of 1 or more count
  //parse the keys that have 1 or more into an array! **
  //key(count), starterA(1), heartStopper(5)

    //TESTING retrieving an array of maps
  //reference to userDoc

//   const countries = [
//     {name: "fetch1", path: "items/starters/starterA.png"}, 
//     {name: "fetch2", path: "items/starters/starterB.png"},
//     {name: "fetch3", path: "items/starters/starterB.png"},


// ];
const loadImage = async (path) => {
  var local = ""
  console.log(path)
  if(!path){
    if (curPath === countries[0].path){
    console.log("f2")
    
    setPath(countries[1].path);
    local = countries[1].path
    }
    else
    {
      setPath(countries[0].path);
      local = countries[0].path
    }
    try {
      const storageRef = ref(storage, local);
      const URL = await getDownloadURL(storageRef);
      setImage(URL);
      console.log("image set");
  
    }
    catch(e){
      console.log(e);
    }

  }

  else{

  console.log("load image")
  setPath(path)
  try {
    const storageRef = ref(storage, path);
    const URL = await getDownloadURL(storageRef);
    setImage(URL);
    console.log("image set");

  }
  catch(e){
    console.log(e);
  }
}
}

useEffect(()=> {
  //replace with loadImage(current)
  const fetchImage = async () => {
    try {
      //starter dummy
      const storageRef = ref(storage, "items/starters/starterB.png");
      const URL = await getDownloadURL(storageRef);
      setImage(URL);
      console.log("done");
      const clientUserDocRefMain = doc(db,'users', userID);
      const clientSnap = await getDoc(clientUserDocRefMain);
      setInventory(clientSnap.data().inventory);
      console.log(countries);
    }
    catch(e)
    {
      console.log(e);
    }
  }
  fetchImage();
  //set displayImage to default starter

  //make ref to starterA
},[])


  const talkButton = async () => {
    console.log("THIS IS THE USER ID", userID);
    setModalVisible(true);
    await matchMake(userID, navigation);
    setModalVisible(false);
  };

  //**onSelect will set activeimg to doc*/
  //The dropdown changes the activeimg value of the doc
  //The options from the dropdown are dependent on the user's inventory
  //
  
    return(
<View style={[ tStyle.container,
          {
            flexDirection: 'column',
          },

]}>
<View style={[{flex:1, flexDirection: 'column', justifyContent:'center', alignItems: 'center', marginTop: 5}, styles.primaryBGoffBlack]}>

  <Text style={[styles.primaryRed, styles.size2]}>[name]</Text>
  <Text style = {[styles.size4, styles.primaryRed]}>player metadata</Text>
  <Text style = {[styles.size5, styles.primaryRed]}>fetched once</Text>
  
  </View>
<View style={[{flex:1, flexDirection: 'row', justifyContent:'center', alignContent: 'center', alignItems: 'center', margin: 20}, styles.secondaryBGoffBlack]}>
  <View style = {{flexDirection: 'column'}}><View style = {{flex:1}}><Text style ={[styles.size4, styles.primaryRed, {fontWeight:'600'}]}>item metadata</Text><Text style ={[styles.size4, styles.primaryRed, {fontWeight:'400'}]}>dropdown triggers fetch</Text></View>
  {/* have a default image for no selection
  dont allow people to click play with no selection
  solved. */}
  <Dropdown
      
      placeholder="view item"
      options={countries}
      optionLabel={'name'}
      optionValue={'path'}
      selectedValue={curPath}
      onValueChange={(value) => loadImage(value)}
      primaryColor={'green'}
      
    />

</View>
  <LoopAnimation
  onPress={() => console.log("Sorry")}
  imageComponent={<Image source={{uri:displayImage}} style={{ width: 150, height: 150 }} />}
/></View>
<View style = {[{flex:0.5, alignItems: 'center', justifyContent: 'center', alignContent: 'center'}, styles.primaryBGoffBlack]}>          
<Modal  animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Searching...</Text>
          </View>
        </View>
      </Modal>
      <FlashButton pressFunc = {talkButton} text={"Play"} ></FlashButton>
      </View>
<View style={[{flex:1}, styles.primaryBGoffBlack, {alignItems: 'center', justifyContent: 'center', alignContent: 'center'}]}><Text style ={[styles.primaryRed, styles.size4]}>fetch note </Text></View>
<View style={[{flex:1}, {backgroundColor: "#1c1c1c", borderBottomLeftRadius: 50, borderBottomRightRadius: 50} ]}><Text style ={[styles.primaryRed, styles.size4]}>test. </Text>
</View>
        <View style={[{flex:0.25}, styles.primaryBGBlack]}> 
        <View style={[{flexDirection:'row'}, { justifyContent: 'center', alignItems: 'center'}]}>
        <IconButton onPress={()=> console.log("Sorry")}></IconButton>
        <IconButton onPress={()=> console.log("Sorry")}></IconButton>
        <IconButton onPress={()=> console.log("Sorry")}></IconButton>
        <IconButton onPress={()=> console.log("Sorry")}></IconButton>
   </View></View></View>
    )
}

export default Test;
const tStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black"
    },
    fab: {
      right: 0,
      bottom: 0,
    },
  });
  
