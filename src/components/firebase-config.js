// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGBJBdFsCj9mo033BWjTrAzk9gTLBlTiY",
  authDomain: "clone-e0fca.firebaseapp.com",
  projectId: "clone-e0fca",
  storageBucket: "clone-e0fca.appspot.com",
  messagingSenderId: "259997310486",
  appId: "1:259997310486:web:2c84a3d72aaa15ef72df37",
  measurementId: "G-D2SNN4T830"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);