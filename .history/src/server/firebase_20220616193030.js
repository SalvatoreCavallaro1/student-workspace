//import firebase from 'firebase';

/*import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';*/

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyA6srdGfxfUv54zn4mJY4MnykSyIlIfvHs",
    authDomain: "student-workspace-9481a.firebaseapp.com",
    projectId: "student-workspace-9481a",
    storageBucket: "student-workspace-9481a.appspot.com",
    messagingSenderId: "1066639130473",
    appId: "1:1066639130473:web:d73de51e0d5ebfdf7147f8",
    measurementId: "G-7Z0NWVCVDV"
  };

// Initialize Firebase


 const app = initializeApp(firebaseConfig); 
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);


export {auth,db,storage};

//export della configurazione di firebase per poterla usare all'interno dell'applicazione
//export default firebase;