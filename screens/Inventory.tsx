import styles from '../essentialComponents/Style';
import type { RootStackParamList } from '../App';
import {doc, db, runTransaction, onSnapshot, updateDoc, increment, deleteDoc, auth } from '../firebase'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, RouteProp, useNavigation, useRoute  } from '@react-navigation/native';
import { Text, View,  SafeAreaView, TouchableOpacity, Platform, FlatList} from 'react-native';
import ChatroomComponent from '../essentialComponents/ChatroomComponent';
import JiltdChat from '../essentialComponents/JiltdChat';
import FlashButton from '../essentialComponents/FlashButton';
import { useEffect, useState} from 'react';
const Inventory = () => {
    //Will have to change home page to
    const [inventory, setInventory] = useState([]);

    return (
        <div></div>
    )
}
export default Inventory
