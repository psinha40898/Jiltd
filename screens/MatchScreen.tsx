import styles from '../essentialComponents/Style';
import type { RootStackParamList } from '../App';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, RouteProp, useNavigation, useRoute  } from '@react-navigation/native';
import { Text, View,  SafeAreaView, TouchableOpacity, Platform} from 'react-native';

import ChatroomComponent from '../essentialComponents/ChatroomComponent';

type MatchScreenRouteProp = RouteProp<RootStackParamList, "MatchScreen">
interface Props{
  route?: MatchScreenRouteProp;
}

const MatchScreen: React.FC<Props> = (props) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const matched = props.route.params.match;
    const me = props.route.params.self;
    const buttonContainerWidth = Platform.OS === 'web' ? '15%' : '40%';
  
    const back = async () => {
        navigation.navigate("Home")

    
      }

    
    
    
    
    return (
        <SafeAreaView style={styles.matchContainer}>

               <View style={[styles.buttonContainer, {width: buttonContainerWidth}]}>
            <TouchableOpacity
            onPress={back}
            style={styles.button}
            >
            <Text style = {styles.buttonText}> back </Text>

          </TouchableOpacity>
          </View>

            <Text>{matched}TEST</Text>
            <Text>{me}TESTE</Text>
            <View style={styles.chatroomContainer}>

          <ChatroomComponent user1Id={me} user2Id={matched} />
        
      </View>

            </SafeAreaView>



    )
};
export default MatchScreen
