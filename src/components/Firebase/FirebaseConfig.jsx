// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcKNwX5zU7bxblXUfqekE6z4yi9GYDmw4",
  authDomain: "programaasistir.firebaseapp.com",
  projectId: "programaasistir",
  storageBucket: "programaasistir.appspot.com",
  messagingSenderId: "524268763470",
  appId: "1:524268763470:web:fefc86cea052fa0658061f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);