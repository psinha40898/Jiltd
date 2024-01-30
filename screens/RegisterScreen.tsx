import { createUserWithEmailAndPassword, auth, doc, db, setDoc, getDoc } from "../firebase"

const RegisterScreen = () => {
    const JiltedRegister = (email, password) => {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password)
                .then(userCredential => {
                    const userID = userCredential.user.uid;
                    const clientUserDocRef = doc(db, 'users', userID);
                    resolve([userID, clientUserDocRef]);
                })
                .catch(error => reject(error));
        });
    }
    
    const handleRegister = async (email, password) => {
        try {
            const userCreds = await JiltedRegister(email, password);
            await setDoc(userCreds[1], { test: 1, test2: 2 });
        } catch (error) {
            alert(error.message);
        }
    }
    
    
    
    
    
    
    
    
    
    return (<div></div>);
}
export default RegisterScreen

