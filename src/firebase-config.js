// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyCMC6MfdyDv5GMohsAnWyyn_kXrVsLRd0U",
  authDomain: "chatroom-d9caf.firebaseapp.com",
  projectId: "chatroom-d9caf",
  storageBucket: "chatroom-d9caf.appspot.com",
  messagingSenderId: "748755082678",
  appId: "1:748755082678:web:7b586383e69f6ce3417517",
  measurementId: "G-LRJ50MRW5N"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBGSjunosjdawEYIJLQ0GNamGW2wc0WYE0",
//   authDomain: "sofia-67aa2.firebaseapp.com",
//   projectId: "sofia-67aa2",
//   storageBucket: "sofia-67aa2.firebasestorage.app",
//   messagingSenderId: "167644712267",
//   appId: "1:167644712267:web:9eb23360f4172633e86cce"
// };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)