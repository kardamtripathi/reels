// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
// import {auth} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClFWNlAr9XzdBFfMGNpMulvVfInLR-rS4",
  authDomain: "reels-2d9f1.firebaseapp.com",
  projectId: "reels-2d9f1",
  storageBucket: "reels-2d9f1.appspot.com",
  messagingSenderId: "334155547974",
  appId: "1:334155547974:web:e002f747cb4163c43f9147"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = {
    users: firestore.collection('users'),
    posts: firestore.collection('posts'),
    comments: firestore.collection('comments'),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage()