import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#070707',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropDown:{
        
        backgroundColor: 'rgba(204, 41, 54, .85)',
        borderRadius: 5,
        
    },
    dropDownRow:{ 
        backgroundColor: 'rgba(204, 41, 54, .85)',
        padding : 5,
        borderRadius: 5,
              
        
    },
    dropDownText:{
        fontSize: 8
    },
    matchContainer: {
        flex: 1,
        backgroundColor: '#070707',
        
    },
    chatroomContainer: {
        flex: 1,
        width: '100%',
      },
    inputContainer: {
        width: '60%',
    
    },
    headerContainer: {
        flexDirection: 'row', // Make children (Text and Image) display in a row
        alignItems: 'center', // Vertically center-align the children
    },
    input: {
        backgroundColor: 'rgba(204, 41, 54, .75)',
        color: 'rgba(232, 180, 188, 1)',
        fontWeight: '100',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5,
        marginTop: 10,
    
    },
    buttonContainer: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    
    },
    button: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        backgroundColor: 'rgba(204, 41, 54, .85)',
        paddingHorizontal: 10,
        paddingVertical: 12.5,
        borderRadius: 5,
    
    
    },
    buttonText: {
        color: 'rgba(232, 180, 188, 1)',
        fontWeight: '900',
    
    },
    buttonOutline: {
        backgroundColor: 'rgba(204, 41, 54, .85)',
        marginTop: 20
    
    },
    buttonOutlineText: {
        color: 'rgba(232, 180, 188, 1)',
        fontWeight: '200',
    
    
    },
    headerText:{
        fontSize: 64,
        color: 'rgba(204, 41, 54, 1)',
        fontWeight: '100',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },


/**Chatbox */
chatTextR:{
    borderRadius: 25,
    padding: 10,
    margin: 5,
    maxWidth: '70%',
    backgroundColor: 'rgba(204, 41, 54, 1)',
},
chatTextL:{
    borderRadius: 25,
    padding: 10,
    margin: 5,
    maxWidth: '70%',
    backgroundColor:"#666666",
},
leftBubble:{
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginLeft: 10
    
   
 
    
},
rightBubble:{
    justifyContent: 'flex-end',
    alignSelf: 'flex-end', 
    marginRight: 10
    
    


},
leftText:{
    textAlign: 'justify'


},
rightText:{
    textAlign: 'justify'

},



    /**Sizes*/
    size1:
    {
        fontSize: 128
    },
    size2:
    {
        fontSize: 64
    },
    size3:
    {
        fontSize: 32
    },
    size4:{
        fontSize: 16
    },
    size5:{
        fontSize: 8
    },
    size6:
    {
        fontSize: 4
    },
    size7:
    {
        fontSize: 2
    },
    /** Text Colors */
    primaryBlack:
    {
        color: 'rgba(7, 7, 7, 1)',
    },

    primaryRed:{
    color: 'rgba(204, 41, 54, 1)',
    },
/** Text Weights */
superHeavy:{

},
heavy:{

},
medium:{

},
normal:{}
,
light:{}
,
frail:{}
,

    secondaryWhite:{
        color :'white'
    },
    /**BG colors */
    primaryBGBlack:{
        backgroundColor: 'rgba(7, 7, 7, 1)'
    },
    primaryBGoffBlack:{
        backgroundColor: '#1c1c1c'
    },
    primaryBGRed:{
        backgroundColor: 'rgba(204, 41, 54, 1)',
    },
    secondaryBGoffBlack:{
        backgroundColor: 'rgba(28, 28, 28, .65)'
    }
    })
    export default styles