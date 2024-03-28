import React, {useEffect, useState, useRef, TouchEvent} from 'react';
import {Text, StyleSheet, View, Image, Modal, Alert, ImageBackground, Animated} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import type { RootStackParamList } from '../App';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../essentialComponents/Style';
import PlayButton from '../essentialComponents/playButton';
import IconButton from '../essentialComponents/Icon';
import LoopAnimation from '../essentialComponents/LoopAnimation';
import { matchMake } from './matchMake';
import { auth, ref, storage, getDownloadURL, doc, getDoc, db, Timestamp} from '../firebase';
// import Dropdown from 'react-native-input-select';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown'
import { Entypo } from '@expo/vector-icons';
import AnimateIcon from '../essentialComponents/AnimateIcon';
//https://www.typescriptlang.org/tsconfig#strict

interface MetaData {
  author: string;
  date: Timestamp | null; // Assuming it's a Firestore Timestamp object
  note: string;
  name :string;
  tooltip: string;
}
const HomePage = () => {

  const userID = auth.currentUser?.uid;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [itemMeta, setImeta] = useState("");
  const [theme, setTheme] = useState("rgba(216, 151, 158, 1)");
  const [clientName, setName] = useState("welcome");
  const [metaData, setData] = useState<MetaData>({ author: '', date: null, note: '', tooltip: '', name: ''});
  const [displayImage, setImage] = useState(null);
  const [curPath, setPath] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [inventory, setInventory] = useState([]);
  var pointer = useRef(0);
 


  // const [touchEnd, setTouchEnd] = useState(null);
  // const [touchEndY, setTouchEndY] = useState(null)

  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchStartY, setTouchStartY] = React.useState<number | null>(null);


  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  const [touchEndY, setTouchEndY] = React.useState<number | null>(null);
  const minSwipeDistance = 100;


  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.nativeEvent.touches[0].pageX);

    setTouchEndY(null);
    setTouchStartY(e.nativeEvent.touches[0].pageY);
  }

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.nativeEvent.touches[0].pageX);
    setTouchEndY(e.nativeEvent.touches[0].pageY);
  }

  const onTouchEnd = () => {
    // const distanceX = touchStart !== null && touchEnd !== null ? touchStart - touchEnd : 0;

    const distanceX = touchStart - touchEnd
    const distanceY = touchStartY - touchEndY
    const isLeftSwipe = distanceX > minSwipeDistance
    const isRightSwipe = distanceX < -minSwipeDistance
    
    if (isRightSwipe && Math.abs(distanceX) > distanceY) {
      console.log("r")
      decrementPointer()
      // add your conditional logic here
    } 
    if (isLeftSwipe && distanceX > distanceY) {
      console.log("l"      )
      incrementPointer()
      // add your conditional logic here
    }
  }

  const [flashValue] = useState(new Animated.Value(0));

  const startFlashAnimation = () => {
    console.log("test");
    Animated.sequence([
      Animated.timing(flashValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(flashValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };





/**
 * _____ 
 * updates the displayed image to the selected one
 * updates the displayed message to the one associated with the selected item
 * @param path path of image on cloud
 * @param note deprecated
 * @param message message metadata that is attached to item
 */
const updateDisplay = async (path, note, message, color) => {
  console.log("loadImage()", path, note, "MESSAGE:", message)
  setPath(path)
  setImeta(note)
  startFlashAnimation();
  console.log("setting", message)
  setData(message)
  setTheme(color)
  
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
/** Init useEffect 
 * TODO: Needs to be configured to load the first item of the user's inventory, whatever it is
 * or
 *  Load a default image until countries changes (loading image), then countries loads and the next useEffect is called
 */
useEffect(()=> {
  const init = async () => {
    try {
      const storageRef = ref(storage, "items/spinner-of-dots.png");
      const URL = await getDownloadURL(storageRef);
      setImage(URL);
      console.log("done");
      const clientUserDocRefMain = doc(db,'users', userID);
      const clientSnap = await getDoc(clientUserDocRefMain);
      setInventory(clientSnap.data().inventory);
      setName(clientSnap.data().displayName);
      console.log(inventory);
      console.log(clientName);
      setPath(inventory[0].path)
      setTheme(inventory[0].theme)
      console.log(inventory[0].theme)
    }
    catch(e)
    {
      console.log(e);
    }
  }
  init();
},[])

/** Updates states when inventory is loaded. Add setImage here 
 *  Updates selected item
 *  Updates the displayed message to the default one
 *  This should also update the image to the default one
*/
useEffect(() => {
  const displayDefaults = async () => {
    if (inventory.length > 0) {
    setData(inventory[0].message)
    setImeta(inventory[0].note);
    setPath(inventory[0].path);
    setTheme(inventory[0].theme);
    const storageRef = ref(storage, inventory[0].path);
    const URL = await getDownloadURL(storageRef);
    setImage(URL);
  }
}
displayDefaults();
}, [inventory]);
useEffect(() => {
  // Start flash animation when component mounts
  startFlashAnimation();
}, []);

/** Enters the user into matchmaking queue */
const talkButton = async () => {
  console.log("THIS IS THE USER ID", userID);
  setModalVisible(true);
  await matchMake(userID, navigation);
  setModalVisible(false);
  };
const exportButton = async () => {
  /** I need to write an export function
   * It should send an email to the user's email
   * Include the quote
   * Include the sender
   * Include the date
   * Include the picture
   */
}

  const incrementPointer = () => {
    if (pointer.current === inventory.length - 1){
      console.log("no dice", pointer);
      pointer.current = 0
      updateDisplay(inventory[pointer.current].path, inventory[pointer.current].note, inventory[pointer.current].message, inventory[pointer.current].theme)
      return;
    }
    console.log("yes dice", pointer)
    pointer.current = pointer.current + 1
    console.log(pointer)
    updateDisplay(inventory[pointer.current].path, inventory[pointer.current].note, inventory[pointer.current].message, inventory[pointer.current].theme)
    return;
  }

  const decrementPointer = () => {
    if (pointer.current === 0){
      console.log("Can't decrement", pointer);
      pointer.current = 0
      updateDisplay(inventory[pointer.current].path, inventory[pointer.current].note, inventory[pointer.current].message, inventory[pointer.current].theme)
      return;}
      console.log("yes dice", pointer)
      pointer.current = pointer.current - 1
      console.log(pointer)
      updateDisplay(inventory[pointer.current].path, inventory[pointer.current].note, inventory[pointer.current].message, inventory[pointer.current].theme)
      return;

  }
  return(

 

<View style={[ tStyle.container, {flexDirection: 'column',},]}>

  <View style={[{flex:1.5, flexDirection: 'row', backgroundColor: theme, borderWidth: 0},]}>

  <View style={{ flex: 1, borderWidth: 0, flexDirection: 'row', marginTop: 30, justifyContent: 'flex-end', margin: 30 }}>
 <View style = {{marginTop: 10}}>
 <MaterialIcons name="home-filled" size={24} color={'rgba(253,254,253,255)'} />
 </View>
  <View style={{ flexDirection: 'column' }}>
      
    <Text style={[styles.bold, styles.size3, { color: 'rgba(253,254,253,255)' }]}>Jiltd</Text>
    <Text style={[styles.bold, styles.size4, { color: 'rgba(253,254,253,255)' }]}>Welcome, displayName</Text>
  </View>
</View>
    {/* {clientName !== '' ?
    (<Text style={[styles.size3, {fontWeight: '600', color: theme}]}>{clientName}</Text>)
    : null
    } */}
  </View>

<View style={[{flex:6, flexDirection: 'column', backgroundColor: 'rgba(28,29,35,255)',borderTopColor: theme, borderTopWidth: 50, padding: 10,}]}>
  {//start}
}
  <View style = {[{flex:2, flexDirection: 'column',padding:10,}]}>

  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  <View>
    <Animated.View style={[zx.overlay, { opacity: flashValue.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [0, 0.25, 0.5, 0.75, 1] }) }]}>
      <View style={{ }}>
        <Image
          source={{ uri: displayImage }}
          resizeMode='contain'
          style={{
            backgroundColor: 'rgba(28,29,35,1)',
            padding: 25,
            width: 100,
            height: 100,
            borderWidth: 8,
            borderColor: 'rgba(28,29,35,255)',
            borderRadius: 60,
            top: -75
          }}
        />
      </View>
    </Animated.View>
  </View>

  <View style={{ flexDirection: 'row' }}>
    <AnimateIcon iconComponent={<Entypo name="arrow-bold-left" size={24} color="rgba(227,229,232,255)" />} onPress={decrementPointer} />
    <AnimateIcon iconComponent={<Entypo name="arrow-bold-right" size={24} color="rgba(227,229,232,255)" />} onPress={incrementPointer} />
  </View>
</View>






 {//Future swipeable!
}

  <Animated.View
        style={[zx.overlay,{padding:0,},{opacity: flashValue.interpolate({inputRange: [0, 0.25, 0.5, 0.75, 1],outputRange: [0, 0.25, 0.5, 0.75, 1],}),},]}>
        <Text style={[styles.size4, {flexWrap: 'wrap', color: 'rgba(227,229,232,255)' ,fontWeight:'700', textAlign: 'left'}]}> {metaData.name} </Text>
        <View style = {[ { alignSelf: 'center', padding:20, borderRadius: 10, backgroundColor: 'rgba(38,39,47,255)', shadowColor: "#000", elevation: 4, width: '100%'}]} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}> 
        
        <Text style={[styles.size4, {flexWrap: 'wrap', color: 'rgba(227,229,232,255)' ,fontWeight:'700', textAlign: 'left'}]}> Saved Message </Text>
        <Text style={[styles.size4, {flexWrap: 'wrap', color: 'rgba(211,212,216,255)' ,fontWeight:'400', textAlign: 'center',}, styles.italic]}>{metaData.note}</Text>

        {metaData.date ? (
          <Text style={[styles.size4, {flexWrap: 'wrap', color: 'rgba(227,229,232,255)' ,fontWeight:'700', textAlign: 'left'}]}> From </Text>
        ): null}

        {metaData.date ? (  
        <Text style={[styles.size4,{color: 'rgba(211,212,216,255)', textAlign: 'center', fontWeight: '400'}]}>
        {metaData.author} on {metaData.date.toDate().toLocaleDateString()}
      </Text>) : null }
      <Text style={[styles.size4, {flexWrap: 'wrap', color: 'rgba(227,229,232,255)' ,fontWeight:'700', textAlign: 'left'}]}> Tooltip </Text>
      <Text style={[styles.size4, {flexWrap: 'wrap', color: 'rgba(211,212,216,255)' ,fontWeight:'400', textAlign: 'center',}, styles.italic]}>{metaData.tooltip}</Text>
<View style = {{}} > 


<AnimateIcon onPress={()=>(console.log("exporting.."))} iconComponent={
<View style = {[ {flexDirection:'row', alignSelf: 'center', paddingTop: 10, paddingBottom: 10, paddingHorizontal: 30, borderRadius: 20, backgroundColor: 'rgba(56,58,67,255)', shadowColor: "#000", margin: 10, elevation: 4,
      }]}>
        <MaterialCommunityIcons name="export-variant" size={22} color='rgba(198,200,206,255)' />
         
         <Text style={[styles.size4, {flexWrap: 'wrap', color: 'rgba(198,200,206,255)',fontWeight:'700', textAlign: 'center'}]}> Export</Text>
        
         </View>
}></AnimateIcon> 

    
</View>
</View></Animated.View>  
  </View>    
  {//end
}
</View>



<View style={[{flex:2, flexDirection: 'column', backgroundColor: 'rgba(28,29,35,255)', padding: 10}]}>    
  <Modal animationType="slide" transparent={true} visible={modalVisible}
      onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)}}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {backgroundColor: theme}]}>
          <Text style={[styles.modalText, styles.italic]}>You are in the queue to find a match. Thank you for trying Jiltd.</Text>
          <Text style={styles.modalText2}>Do not deal with personal information.</Text>
          <Text style={styles.modalText2}>Be respectful.</Text>
          {/* <Text style={styles.modalText2}>Try your best to help.</Text> */}
        </View>
        </View>
      </Modal>
      {/**Start inner block */}
    <View style = {{}} > 
      <AnimateIcon onPress={talkButton} iconComponent={
          <View style = {[ {flexDirection:'row', alignSelf: 'center', paddingTop: 10, paddingBottom: 10, paddingHorizontal: 30, borderRadius: 20, backgroundColor: 'rgba(56,58,67,255)', shadowColor: "#000", margin: 10, elevation: 4,}]}>
      <MaterialCommunityIcons name="cards-playing-diamond" size={64} color = 'rgba(227,229,232,255)'  />
      </View>}>
      </AnimateIcon> 
    </View>
</View>


<View style={[{flex:0.75}, styles.primaryBGBlack]}> 
        <View style={[{flexDirection:'row'}, { justifyContent: 'center', alignItems: 'center'}]}>
          <IconButton onPress={()=> console.log("Sorry")} color={theme}></IconButton>
        </View>
  </View>

</View>




    )
}

export default HomePage;
const tStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1A1A1A'
     
    },
    fab: {
      right: 0,
      bottom: 0,
    },
  });
  
  const zx = StyleSheet.create({
    overlay:{backgroundColor: 'rgba(0, 15, 8, 0)'}
    ,
  });
