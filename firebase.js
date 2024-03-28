"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.increment = exports.QuerySnapshot = exports.CollectionReference = exports.Transaction = exports.QueryDocumentSnapshot = exports.DocumentSnapshot = exports.DocumentReference = exports.updateDoc = exports.connectAuthEmulator = exports.getAuth = exports.runTransaction = exports.where = exports.query = exports.orderBy = exports.getDoc = exports.Timestamp = exports.addDoc = exports.onSnapshot = exports.getDocs = exports.collection = exports.setDoc = exports.doc = exports.db = exports.getDownloadURL = exports.uploadBytes = exports.ref = exports.storage = exports.signOut = exports.signInWithEmailAndPassword = exports.createUserWithEmailAndPassword = exports.auth = exports.deleteDoc = void 0;
// Import the functions you need from the SDKs you need
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
Object.defineProperty(exports, "getAuth", { enumerable: true, get: function () { return auth_1.getAuth; } });
Object.defineProperty(exports, "createUserWithEmailAndPassword", { enumerable: true, get: function () { return auth_1.createUserWithEmailAndPassword; } });
Object.defineProperty(exports, "signOut", { enumerable: true, get: function () { return auth_1.signOut; } });
Object.defineProperty(exports, "signInWithEmailAndPassword", { enumerable: true, get: function () { return auth_1.signInWithEmailAndPassword; } });
Object.defineProperty(exports, "connectAuthEmulator", { enumerable: true, get: function () { return auth_1.connectAuthEmulator; } });
var firestore_1 = require("firebase/firestore");
Object.defineProperty(exports, "updateDoc", { enumerable: true, get: function () { return firestore_1.updateDoc; } });
Object.defineProperty(exports, "deleteDoc", { enumerable: true, get: function () { return firestore_1.deleteDoc; } });
Object.defineProperty(exports, "doc", { enumerable: true, get: function () { return firestore_1.doc; } });
Object.defineProperty(exports, "setDoc", { enumerable: true, get: function () { return firestore_1.setDoc; } });
Object.defineProperty(exports, "collection", { enumerable: true, get: function () { return firestore_1.collection; } });
Object.defineProperty(exports, "getDocs", { enumerable: true, get: function () { return firestore_1.getDocs; } });
Object.defineProperty(exports, "onSnapshot", { enumerable: true, get: function () { return firestore_1.onSnapshot; } });
Object.defineProperty(exports, "addDoc", { enumerable: true, get: function () { return firestore_1.addDoc; } });
Object.defineProperty(exports, "Timestamp", { enumerable: true, get: function () { return firestore_1.Timestamp; } });
Object.defineProperty(exports, "getDoc", { enumerable: true, get: function () { return firestore_1.getDoc; } });
Object.defineProperty(exports, "orderBy", { enumerable: true, get: function () { return firestore_1.orderBy; } });
Object.defineProperty(exports, "query", { enumerable: true, get: function () { return firestore_1.query; } });
Object.defineProperty(exports, "where", { enumerable: true, get: function () { return firestore_1.where; } });
Object.defineProperty(exports, "runTransaction", { enumerable: true, get: function () { return firestore_1.runTransaction; } });
Object.defineProperty(exports, "DocumentReference", { enumerable: true, get: function () { return firestore_1.DocumentReference; } });
Object.defineProperty(exports, "DocumentSnapshot", { enumerable: true, get: function () { return firestore_1.DocumentSnapshot; } });
Object.defineProperty(exports, "QueryDocumentSnapshot", { enumerable: true, get: function () { return firestore_1.QueryDocumentSnapshot; } });
Object.defineProperty(exports, "Transaction", { enumerable: true, get: function () { return firestore_1.Transaction; } });
Object.defineProperty(exports, "CollectionReference", { enumerable: true, get: function () { return firestore_1.CollectionReference; } });
Object.defineProperty(exports, "QuerySnapshot", { enumerable: true, get: function () { return firestore_1.QuerySnapshot; } });
Object.defineProperty(exports, "increment", { enumerable: true, get: function () { return firestore_1.increment; } });
var storage_1 = require("firebase/storage"); // Import the storage instance
Object.defineProperty(exports, "ref", { enumerable: true, get: function () { return storage_1.ref; } });
Object.defineProperty(exports, "uploadBytes", { enumerable: true, get: function () { return storage_1.uploadBytes; } });
Object.defineProperty(exports, "getDownloadURL", { enumerable: true, get: function () { return storage_1.getDownloadURL; } });
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyDToLat9Zbir81RyIaMGWXW4os30FkGwmk",
    authDomain: "jiltd-aa8b6.firebaseapp.com",
    projectId: "jiltd-aa8b6",
    storageBucket: "jiltd-aa8b6.appspot.com",
    messagingSenderId: "894393847134",
    appId: "1:894393847134:web:d2253f8e16c4d583e213cf",
    measurementId: "G-SVCX91EL72"
};
// Initialize Firebase
var app = (0, app_1.initializeApp)(firebaseConfig);
var auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
var storage = (0, storage_1.getStorage)(app);
exports.storage = storage;
var db = (0, firestore_1.getFirestore)(app);
exports.db = db;
