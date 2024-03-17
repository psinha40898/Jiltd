import React, {useEffect, useState, useRef} from 'react';
import {Text, StyleSheet, View, Image, Modal, Alert, ImageBackground, Animated} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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

interface MetaData {
  author: string;
  date: Timestamp | null; // Assuming it's a Firestore Timestamp object
  note: string;
}
const Test = () => {
  const userID = auth.currentUser.uid;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [itemMeta, setImeta] = useState("");
  const [theme, setTheme] = useState("rgba(216, 151, 158, 1)");
  const [clientName, setName] = useState("welcome");
  const [metaData, setData] = useState<MetaData>({ author: '', date: null, note: '' });
  const [displayImage, setImage] = useState(null);
  const [curPath, setPath] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [inventory, setInventory] = useState([]);
  var pointer = useRef(0);
  console.log(pointer, "render")


  const [flashValue] = useState(new Animated.Value(0));

  const startFlashAnimation = () => {
    console.log("test");
    Animated.sequence([
      Animated.timing(flashValue, {
        toValue: 0,
        duration: 30,
        useNativeDriver: true,
      }),
      Animated.timing(flashValue, {
        toValue: 1,
        duration: 30,
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


  <View style={[{flex:1, flexDirection: 'row'}, styles.primaryBGoffBlack]}>


 
  <Animated.View
        style={[
          zx.overlay, {flex:1, flexDirection: 'row', alignItems: 'center', marginTop: 30},
          {
            opacity: flashValue.interpolate({
              inputRange: [0, 0.25, 0.5, 0.75, 1],
              outputRange: [0, 0.25, 0.5, 0.75, 1],
            }),
          },
        ]}
      >
 
 <MaterialIcons name="home-filled" size={64} color={theme} />



  
  
 
 <View style = {{flexDirection: 'column'}}>
 <Text style= {[styles.bold,styles.size4, {color:theme}]}>Jiltd</Text>
 <Text style= {[styles.bold,styles.size5, {color:theme}]}>Press Play</Text>

  
 </View>
    
     


  </Animated.View>
  

  
 
    {/* {clientName !== '' ?
    (<Text style={[styles.size3, {fontWeight: '600', color: theme}]}>{clientName}</Text>)
    : null
    } */}
  </View>





<View style={[{flex:3, flexDirection: 'column', backgroundColor: 'rgba(72, 72, 72, 1)',borderTopColor: 'rgba(28, 28, 28, .925)', borderTopWidth: 50, padding: 10}]}>
  
  <View style = {[{flex:1.25, flexDirection: 'column',padding:10 }]}>
  <Animated.View
        style={[
          zx.overlay,{},
          {
            opacity: flashValue.interpolate({
              inputRange: [0, 0.25, 0.5, 0.75, 1],
              outputRange: [0, 0.25, 0.5, 0.75, 1],
            }),
          },
        ]}
      >
        <View style = {{alignSelf:'center'}}>
        <Image source={{uri:displayImage}} resizeMode ='contain' style={{ backgroundColor:'rgba(30,30,30,0.5)', padding:25, width: 100, height: 100, borderWidth: 6, 
        borderColor: 'rgba(72, 72, 72, 1)', top: -50, borderRadius: 60,  }} />


        
        </View>




  {/* <LoopAnimation
  onPress={() => console.log("Sorry")}
  imageComponent={<Image source={{uri:displayImage}} style={{ width: 150, height: 150 }} />}
/> */}
</Animated.View>
<View style = {{flexDirection: 'row', borderWidth:0, alignSelf: 'center', padding: 10}}>

<AnimateIcon onPress={decrementPointer} iconComponent={<Entypo name="arrow-bold-left" size={32} color={theme} />}></AnimateIcon>
<AnimateIcon onPress={incrementPointer} iconComponent={<Entypo name="arrow-bold-right" size={32} color={theme} />}></AnimateIcon> 

</View>




  <Animated.View
        style={[
          zx.overlay,{padding:10},
          {
            opacity: flashValue.interpolate({
              inputRange: [0, 0.25, 0.5, 0.75, 1],
              outputRange: [0, 0.25, 0.5, 0.75, 1],
            }),
           
          },
        ]}
      >
        
        <View style = {[ {width:'75%', alignSelf: 'center', padding:10, borderRadius: 20, backgroundColor: 'rgba(28, 28, 28, .925)',
        shadowColor: "#000", 
        
        elevation: 4,
      
      }]}> 
      
        <Text style={[styles.size4, {flexWrap: 'wrap', color: theme ,fontWeight:'700', textAlign: 'left'}]}> Saved Message </Text>
        <Text style={[styles.size4, {flexWrap: 'wrap', color: theme ,fontWeight:'400', textAlign: 'center',}, styles.italic]}>{metaData.note}</Text>

        {metaData.date ? (
            <Text style={[styles.size4, {flexWrap: 'wrap', color: theme ,fontWeight:'700', textAlign: 'left'}]}> From </Text>
        ): null}

        {metaData.date ? (  
          
  <Text style={[styles.size4,{color: 'rgba(216, 151, 158, 1)', textAlign: 'center', fontWeight: '400'}]}>
    {metaData.author} on {metaData.date.toDate().toLocaleDateString()}
  </Text>) 
  : null
  }
          
           </View>

           <View style = {[ {width:'25%', alignSelf: 'center', padding:10, borderRadius: 15, backgroundColor: 'rgba(28, 28, 28, .925)',
        shadowColor: "#000",
        
        elevation: 4,
      
      }]}>
         <Text style={[styles.size4, {flexWrap: 'wrap', color: theme ,fontWeight:'700', textAlign: 'center'}]}>Export</Text>
        
         </View>

    
           </Animated.View>


{/*   
  <Dropdown
        style={[zx.dropdown, {backgroundColor: theme}]}
        placeholderStyle={zx.pstyle}
        selectedTextStyle={zx.texstyle}
        inputSearchStyle={zx.inputSearchStyle}
        iconStyle={zx.iconStyle}
        data={inventory}
        containerStyle={[zx.contstyle, {backgroundColor: theme, borderColor: theme}]}
       
        iconColor='rgba(0,0,0,1)'
        maxHeight={300}
        labelField="name"
        activeColor='rgba(204, 41, 54, 1)'
        itemContainerStyle={zx.item}
        itemTextStyle={zx.itemtxt}
        
        valueField="path"
        placeholder="loading..."
        searchPlaceholder="search..."
        value={curPath}
        onChange={item => {
          updateDisplay(item.path, item.note, item.message, item.theme);
        }}
  
       
      /> */}



  
  
  </View>





       
</View>

<View style = {[{flex:1.5, alignItems: 'center', justifyContent: 'center', alignContent: 'center'}, styles.primaryBGoffBlack]}>      
  <Modal  animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {backgroundColor: theme}]}>
          <Text style={[styles.modalText, styles.italic]}>You are in the queue to find a match. Thank you for trying Jiltd.</Text>
          <Text style={styles.modalText2}>Do not deal with personal information.</Text>
          <Text style={styles.modalText2}>Be respectful.</Text>
          {/* <Text style={styles.modalText2}>Try your best to help.</Text> */}

          </View>
        </View>
      </Modal>
      <Animated.View
        style={[
          zx.overlay,
          {
            opacity: flashValue.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, .75, 1],
            }),
          },
        ]}
      >

    <PlayButton onPress={talkButton} theme={theme}></PlayButton>


   
    </Animated.View>
  </View>

<View style={[{flex:1}, {alignItems: 'center', justifyContent: 'center',backgroundColor: 'rgba(72, 72, 72, 0.8)', borderBottomLeftRadius: 50, borderBottomRightRadius: 50}]}>

</View>

<View style={[{flex:0.5}, styles.primaryBGBlack]}> 
        <View style={[{flexDirection:'row'}, { justifyContent: 'center', alignItems: 'center'}]}>
          <IconButton onPress={()=> console.log("Sorry")} color={theme}></IconButton>
        </View>
</View>



</View>




    )
}

export default Test;
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
    selectedStyle: {
      borderRadius: 12,
    },
    dropdown: {
      borderRadius : 5,
      margin: 16,
      height: 30,
      width: '50%'
      
    },
    overlay:{backgroundColor: 'rgba(0, 15, 8, 0)'}
    ,
    item:{
      borderRadius : 0,
      padding:0,
     
    },
    itemtxt:{
      fontWeight:'600'
    },
    contstyle: {
      borderRadius : 5,
      margin: 16,
      borderWidth: 5

      
    },
    texstyle: {
      textAlign: 'center',
      color:'black',
      fontWeight: '600'
    },
    pstyle: {
      textAlign: 'center',
      color:'white',
      fontWeight: '600',
      fontSize: 8
    },
    icon: {
      paddingRight: 0
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
 
      fontWeight: '600',
    },
  });
