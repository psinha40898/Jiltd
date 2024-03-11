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
import { auth, ref, storage, getDownloadURL, doc, getDoc, db, Timestamp} from '../firebase';
// import Dropdown from 'react-native-input-select';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import SelectDropdown from 'react-native-select-dropdown'

// syntax
// <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
interface MetaData {
  author: string;
  date: Timestamp; // Assuming it's a Firestore Timestamp object
  note: string;
}
const Test = () => {
  const userID = auth.currentUser.uid;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [itemMeta, setImeta] = useState("");
  const [metaData, setData] = useState<MetaData>({ author: '', date: Timestamp.now(), note: '' });
  const [displayImage, setImage] = useState(null);
  const [curPath, setPath] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [countries, setInventory] = useState([]);

const loadImage = async (path, note, message) => {
  console.log("loadImage()", path, note, "MESSAGE:", message)
  setPath(path)
  setImeta(note)
  console.log("setting", message)
  setData(message)
  console.log("set", metaData)
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

useEffect(()=> {
  const fetchImage = async () => {
    try {
      const storageRef = ref(storage, "items/starters/starterA.png");
      const URL = await getDownloadURL(storageRef);
      setImage(URL);
      console.log("done");
      const clientUserDocRefMain = doc(db,'users', userID);
      const clientSnap = await getDoc(clientUserDocRefMain);
      setInventory(clientSnap.data().inventory);
      console.log(countries);
      setPath(countries[0].path)
    }
    catch(e)
    {
      console.log(e);
    }
  }
  fetchImage();
},[])
useEffect(() => {
  if (countries.length > 0) {
    setData(countries[0].message)
    setImeta(countries[0].note);
    setPath(countries[0].path);
  }
}, [countries]);


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
<View style={[{flex:1, flexDirection: 'row', justifyContent:'center', alignContent: 'center', alignItems: 'center', margin: 10}, styles.secondaryBGoffBlack]}>
  <View style = {{flex:1, flexDirection: 'column'}}><View style = {{flex:1}}><Text style ={[styles.size4, styles.primaryRed, {fontWeight:'600', textAlign: 'center'}]}>"{itemMeta}"</Text>
  <Text>{metaData.author} {metaData.date.toString()}</Text>


  </View>
  {/* have a default image for no selection
  dont allow people to click play with no selection
  solved. */}
  <View style = {{flex:1, marginBottom: 20}}> 

  {/* https://github.com/hoaphantn7604/react-native-element-dropdown?tab=readme-ov-file */}
  <Dropdown
        style={zx.dropdown}
        placeholderStyle={zx.placeholderStyle}
        selectedTextStyle={zx.texstyle}
        inputSearchStyle={zx.inputSearchStyle}
        iconStyle={zx.iconStyle}
        data={countries}
        search
        containerStyle={zx.contstyle}
        
        maxHeight={300}
        labelField="name"
        activeColor='rgba(204, 41, 54, 1)'
        itemContainerStyle={zx.item}
        itemTextStyle={zx.itemtxt}
        valueField="path"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={curPath}
        onChange={item => {
          loadImage(item.path, item.note, item.message);
          console.log("change");
        }}
        renderLeftIcon={() => (
          <AntDesign style={zx.icon} color="black" name="Safety" size={20} />
        )}
       
      />

    </View>




</View>
  <LoopAnimation
  onPress={() => console.log("Sorry")}
  imageComponent={<Image source={{uri:displayImage}} style={{ width: 150, height: 150 }} />}
/></View>
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
            <Text style={styles.modalText}>Searching...</Text>
          </View>
        </View>
      </Modal>

      <FlashButton pressFunc = {talkButton} text={"Play"} ></FlashButton>
      </View>
<View style={[{flex:1}, styles.primaryBGoffBlack, {alignItems: 'center', justifyContent: 'center', alignContent: 'center'}]}><Text style ={[styles.primaryRed, styles.size4]}>... </Text></View>
<View style={[{flex:1}, {backgroundColor: "#1c1c1c", borderBottomLeftRadius: 50, borderBottomRightRadius: 50} ]}><Text style ={[styles.primaryRed, styles.size4]}> ... </Text>
</View>
        <View style={[{flex:0.5}, styles.primaryBGBlack]}> 
        <View style={[{flexDirection:'row'}, { justifyContent: 'center', alignItems: 'center'}]}>
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
  
  const zx = StyleSheet.create({
    selectedStyle: {
      borderRadius: 12,
    },
    dropdown: {
      backgroundColor: 'rgba(204, 41, 54, .75)',
      borderRadius : 15,
      margin: 16,
      height: 30,
      
    },
    item:{
      borderRadius : 0,
      padding:5
    },
    itemtxt:{
      fontWeight:'600'
    },
    contstyle: {
      backgroundColor: 'rgba(204, 41, 54, .75)',
      borderRadius : 15,
      margin: 16,
      borderColor: 'rgba(204, 41, 54, .45)',
      borderWidth: 5

      
    },
    texstyle: {
      textAlign: 'center',
      color:'white',
      fontWeight: '600'
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
    },
  });
