import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDAx3cL71h3_EiHLPv6DXn2CdebspUubsA",
  authDomain: "ecommerce-vintage.firebaseapp.com",
  projectId: "ecommerce-vintage",
  storageBucket: "ecommerce-vintage.appspot.com",
  messagingSenderId: "671699102764",
  appId: "1:671699102764:web:4e3985e64c684269f2f589"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore( app);
const auth = getAuth();

export { db, auth };