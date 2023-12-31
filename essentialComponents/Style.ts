import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#070707',
        justifyContent: 'center',
        alignItems: 'center',
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
    
    })
    export default styles