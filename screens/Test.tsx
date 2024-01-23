import React, {useState} from 'react';
import {Text, StyleSheet, View,  ScrollView,Image, Modal, Alert} from 'react-native';
import { useNavigation, useRoute  } from '@react-navigation/native';
import type { RootStackParamList } from '../App';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styles from '../essentialComponents/Style';
import FlashButton from '../essentialComponents/FlashButton';
import IconButton from '../essentialComponents/Icon';
import LoopAnimation from '../essentialComponents/LoopAnimation';
import { matchMake } from './matchMake';
import { auth } from '../firebase';


const Test = () => {
  const userID = auth.currentUser.uid;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);;
  const talkButton = async () => {
    console.log("THIS IS THE USER ID", userID);
    setModalVisible(true);
    //start loading screen
    //state = true
    await matchMake(userID, navigation);
    setModalVisible(false);
    //end loading screen
    //state = false
  };
  
    return(
<View style={[ tStyle.container,
          {
            flexDirection: 'column',
          },

]}>
<View style={[{flex:1, flexDirection: 'row', justifyContent:'center', alignItems: 'center', marginTop: 5}, styles.primaryBGoffBlack]}>
  <Text style={[styles.primaryRed, styles.size2]}>hi.</Text></View>
<View style={[{flex:1, flexDirection: 'row', justifyContent:'center', alignContent: 'center', alignItems: 'center', margin: 10}, styles.secondaryBGoffBlack]}>
  <View style = {{flexDirection: 'column'}}><Text style ={[styles.size4, styles.primaryRed, {fontWeight:'600'}]}>smiley heartstopper</Text><Text style ={[styles.size4, styles.primaryRed]}>level 1</Text><Text style ={[styles.size4, styles.primaryRed]}>5 reps</Text><Text style ={[styles.size4, styles.primaryRed]}>5 negs</Text><Text style ={[styles.size4, styles.primaryRed]}>avatarName</Text></View>
  <LoopAnimation
  onPress={() => console.log("Sorry")}
  imageComponent={<Image source={require('../images/heart-face-flatline.png')} style={{ width: 150, height: 150 }} />}
/></View>
<View style = {[{flex:0.5, alignItems: 'center', justifyContent: 'center', alignContent: 'center'}, styles.primaryBGoffBlack]}>          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Searching...</Text>
          </View>
        </View>
      </Modal><FlashButton pressFunc = {talkButton} text={"Play"} ></FlashButton></View>
<View style={[{flex:1}, styles.primaryBGoffBlack, {alignItems: 'center', justifyContent: 'center', alignContent: 'center'}]}><Text style ={[styles.primaryRed, styles.size4]}>what kind of idea are you? </Text></View>
<View style={[{flex:1}, {backgroundColor: "#1c1c1c", borderBottomLeftRadius: 50, borderBottomRightRadius: 50} ]}><Text style ={[styles.primaryRed, styles.size4]}>test. </Text></View>
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
  
