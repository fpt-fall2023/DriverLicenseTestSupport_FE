// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
 


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVDB-jS9fsrDv3jqk2--5SZgp2QuqvOBM",
  authDomain: "uploadphotodrivingtest.firebaseapp.com",
  projectId: "uploadphotodrivingtest",
  storageBucket: "uploadphotodrivingtest.appspot.com",
  messagingSenderId: "683740583701",
  appId: "1:683740583701:web:b9c6ec90193d3b40163b1c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)