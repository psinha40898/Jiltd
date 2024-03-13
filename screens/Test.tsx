import React, {useEffect, useState, useRef} from 'react';
import {Text, StyleSheet, View, Image, Modal, Alert, ImageBackground, Animated} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
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


  const [flashValue] = useState(new Animated.Value(0));

  const startFlashAnimation = () => {
    console.log("test");
    Animated.sequence([
      Animated.timing(flashValue, {
        toValue: 0,
        duration: 225,
        useNativeDriver: true,
      }),
      Animated.timing(flashValue, {
        toValue: 1,
        duration: 225,
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


  return(

    <ImageBackground source ={require('../images/bg.jpg')}
    
resizeMode='cover'
style={{flex:1}}
>

<View style={[ tStyle.container, {flexDirection: 'column',},]}>


  <View style={[{flex:1, flexDirection: 'column', justifyContent:'center', marginTop: 5}, styles.primaryBGoffBlack]}>
  <Animated.View
        style={[
          zx.overlay,
          {
            opacity: flashValue.interpolate({
              inputRange: [0, 0.25, 0.5, 0.75, 1],
              outputRange: [0, 0.25, 0.5, 0.75, 1],
            }),
          },
        ]}
      >
 <MaterialIcons name="home-filled" size={64} color={theme} />
  </Animated.View>
 
    {/* {clientName !== '' ?
    (<Text style={[styles.size3, {fontWeight: '600', color: theme}]}>{clientName}</Text>)
    : null
    } */}
  </View>

<View style={[{flex:1.5, flexDirection: 'row', justifyContent:'center', alignContent: 'center', alignItems: 'center', margin: 20, borderRadius: 8}, styles.secondaryBGoffBlack]}>
  <View style = {{flex:1, flexDirection: 'column'}}>
  <View style = {{flex:1, justifyContent: 'center', padding: 5}}>
  <Animated.View
        style={[
          zx.overlay,
          {
            opacity: flashValue.interpolate({
              inputRange: [0, 0.25, 0.5, 0.75, 1],
              outputRange: [0, 0.25, 0.5, 0.75, 1],
            }),
          },
        ]}
      >
  <Text style={[styles.size4, {color: theme ,fontWeight:'600', textAlign: 'center'}]}>
    {metaData.note}
    </Text>
    

  {metaData.date ? (  
  <Text style={[styles.italic,{color: 'rgba(216, 151, 158, 1)', marginLeft: 15, fontSize: 10, fontWeight: '500'}]}>
    {metaData.author} {metaData.date.toDate().toLocaleDateString()}
  </Text>) 
  : null
  }
  
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
  
       
      />
      </Animated.View>
</View>
</View>
<Animated.View
        style={[
          zx.overlay,
          {
            opacity: flashValue.interpolate({
              inputRange: [0, 0.25, 0.5, 0.75, 1],
              outputRange: [0, 0.25, 0.5, 0.75, 1],
            }),
          },
        ]}
      >
  <LoopAnimation
  onPress={() => console.log("Sorry")}
  imageComponent={<Image source={{uri:displayImage}} style={{ width: 150, height: 150 }} />}
/>
</Animated.View>
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
          <View style={styles.modalView}>
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

<View style={[{flex:1}, {alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: 50, borderBottomRightRadius: 50}, styles.primaryBGoffBlack ]}>
  <Text style ={[ styles.size4, {color: '#75e4b3', fontWeight: '900'}]}>0</Text>
</View>

<View style={[{flex:0.5}, styles.primaryBGBlack]}> 
        <View style={[{flexDirection:'row'}, { justifyContent: 'center', alignItems: 'center'}]}>
          <IconButton onPress={()=> console.log("Sorry")}></IconButton>
        </View>
</View>



</View>

</ImageBackground>


    )
}

export default Test;
const tStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0, 15, 8, .85)',
     
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
