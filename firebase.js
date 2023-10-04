// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, getDocs, onSnapshot, addDoc, Timestamp, getDoc, orderBy, query, where, connectFirestoreEmulator, runTransaction } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";  // Import the storage instance
// import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDToLat9Zbir81RyIaMGWXW4os30FkGwmk",
  authDomain: "jiltd-aa8b6.firebaseapp.com",
  projectId: "jiltd-aa8b6",
  storageBucket: "jiltd-aa8b6.appspot.com",
  messagingSenderId: "894393847134",
  appId: "1:894393847134:web:d2253f8e16c4d583e213cf",
  measurementId: "G-SVCX91EL72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
         storage, ref, uploadBytes, getDownloadURL, db, doc, setDoc, collection, getDocs,
         onSnapshot, addDoc, Timestamp, getDoc, orderBy, query, where, runTransaction, 
        getAuth, connectAuthEmulator
        }