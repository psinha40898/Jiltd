import { createUserWithEmailAndPassword, signInWithEmailAndPassword, auth, doc, db, setDoc, getDoc, ref, getDownloadURL, storage, Timestamp} from "../firebase"
import FlashButton from "../essentialComponents/FlashButton";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styles from "../essentialComponents/Style";
import { useState, useEffect} from "react";
import { ParamListBase, RouteProp, useNavigation, useRoute  } from '@react-navigation/native';
import { View, TextInput, Text, Image } from "react-native";
import AnimateIcon from "../essentialComponents/AnimateIcon";
import type { RootStackParamList } from '../App';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
type MatchScreenRouteProp = RouteProp<RootStackParamList, "SecondRegister">
interface Props{
  route?: MatchScreenRouteProp;
}

const SecondRegister: React.FC<Props> = (props) => {
    const dName = props.route.params.name;
    const clientUserID = auth.currentUser.uid;
    const clientUserDocRefMain = doc(db,'users',clientUserID);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [active, setActive] = useState('')
    const [starterA, setA] = useState(null);
    const [starterB, setB] = useState(null);
    const [starterC, setC] = useState(null);
    //fetch these objects from db later
    var objectA = {name: "lost blue pup", count:1, message:{date: Timestamp.now(), author: "Created", name:"lost blue pup", note: "You may never get another.", tooltip: "You think you chose the cutest one."}, path: "items/starters/blueDog.webp", theme: 'rgba(71,196,222,255)'}
    var objectB = {name: "invincible purple rabbit", count:1, message:{date: Timestamp.now(), author: "Created", name:"invincible purple rabbit", note: "You may never get another.", tooltip: "The invincibility is self proclaimed."}, path: "items/starters/purpleRabbit.webp", theme: 'rgba(204,10,251,255)'}
    var objectC = {name: "great dragon", count:1, message:{date: Timestamp.now(), author: "Created", name:"great dragon", note: "You may never get another.", tooltip: "Wow!"}, path: "items/starters/yellowDragon.webp", theme: 'rgba(196,104,23,255)'}
    const backButton = async () => {
        navigation.navigate("Login")
    
      }
    const finishButton = async () => {
        var starter = {}
        if (dName === ''){
            console.log("DEBUG ERROR NICK EMPTY")
            return;
        }
        if (active === 'A') {
            starter = objectA
        }
        else if (active === 'B')
        {
            starter = objectB
        }
        else if (active === 'C')
        {
            starter = objectC
        }
        try {
            console.log("registered with default stats")
            await setDoc(clientUserDocRefMain, {displayName: dName, email: auth.currentUser.email, jilt: true, rating: 0, matchedID: "None", inventory: [starter], new: true, official: true}, {merge: true})
            console.log("Success");
            navigation.navigate("HomePage")
        } catch (error) {
            alert(error.message);
        }

    }
    useEffect(() => {
        // This function will be executed whenever the 'active' state changes
        console.log("Active changed:", active);
        // You can perform any actions you want to do when 'active' changes here
    }, [active]); // 'active' is added as a dependency here
    useEffect(()=> {
        const init = async () => {
          try {
            const Aref = ref(storage, "items/starters/dogSi.webp");
            const A = await getDownloadURL(Aref);
            const Bref = ref(storage, "items/starters/rabSi.webp");
            const B = await getDownloadURL(Bref);
            const Cref = ref(storage, "items/starters/dragSi.webp");
            const C = await getDownloadURL(Cref);
            setA(A);
            setB(B);
            setC(C);
            console.log("done");

          }
          catch(e)
          {
            console.log(e);
          }
        }
        init();
      },[])

    
    
    const handleRegister = async (email, password, nick) => {
        console.log("Being calledHR")
        //let active = "a"
        var starter = {}
        if (nick === ''){
            console.log("DEBUG ERROR NICK EMPTY")
            return;
        }
        if (active === 'A') {
            starter = objectA
        }
        else if (active === 'B')
        {
            starter = objectB
        }
        else if (active === 'C')
        {
            starter = objectC
        }
        try {
            
            console.log("registered with default stats")
            console.log(nick)
            await setDoc(clientUserDocRefMain, {displayName: nick, email: auth.currentUser.email, jilt: true, rating: 0, matchedID: "None", inventory: [starter], new: true}, {merge: true})
            console.log("SUCCESS")
        } catch (error) {
            alert(error.message);
        }
    }


    
    
    
    
    
    
    
    
    
    return (        <KeyboardAwareScrollView style = {{flex:1, flexDirection:'column', backgroundColor: 'rgba(28,29,35,255)'}}>

        <View style ={{flex:0.25, padding: 10, justifyContent: 'center', borderWidth: 0, marginTop: 20}}><Text style ={[ styles.size2, { fontWeight: '700', textAlign: 'left', color: 'rgba(227,229,232,255)'}]}>Jiltd</Text></View>
        <View style = {{flex:1, borderWidth: 0, width : '100%', alignSelf: 'center', padding: 20}}>  
 
        <View style = {{marginTop: 10}}><Text style ={[ styles.size3, { fontWeight: '700', textAlign: 'left', color: 'rgba(227,229,232,255)'}]}>pick one.</Text></View>
       
        <View style = {{borderWidth: 0, flexDirection: 'row', flex:1, justifyContent: 'center', padding: 20, marginTop: 10}}>


        <AnimateIcon onPress = {()=> setActive('A')} iconComponent={<Image source={{uri:starterA}} resizeMode ='contain' style={{ backgroundColor:'rgba(28,29,35,.25)', padding:25, width: 75, height: 75, borderWidth: active === 'A' ? 6 : 2,
        borderColor: '#e3e5e8', borderRadius: 10,  }} />}></AnimateIcon>
<AnimateIcon onPress = {()=> setActive('B')}iconComponent={<Image source={{uri:starterB}} resizeMode ='contain' style={{ backgroundColor:'rgba(28,29,35,.25)', padding:25, width: 75, height: 75, borderWidth: active === 'B' ? 6 : 2,
        borderColor: '#e3e5e8', borderRadius: 10,  }} />}></AnimateIcon>

<AnimateIcon onPress = {()=> setActive('C')} iconComponent={<Image source={{uri:starterC}} resizeMode ='contain' style={{ backgroundColor:'rgba(28,29,35,.25)', padding:25, width: 75, height: 75,  borderWidth: active === 'C' ? 6 : 2, 
        borderColor: '#e3e5e8', borderRadius: 10,  }} />}></AnimateIcon>

        </View>
     
        
        </View>
        <View style = {{flex:1, margin: 20, marginTop: 40}}>
        <FlashButton pressFunc={finishButton} text={"Finish"} ></FlashButton>
        <FlashButton pressFunc={backButton} text={"Back"} ></FlashButton>
        </View>
              
    </KeyboardAwareScrollView>)
};
export default SecondRegister

