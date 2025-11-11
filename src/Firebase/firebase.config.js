// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjL9rteJPkfKAQKdD5YyqftgYv8Gw2fLQ",
  authDomain: "foodloversnetwork-3cf4d.firebaseapp.com",
  projectId: "foodloversnetwork-3cf4d",
  storageBucket: "foodloversnetwork-3cf4d.firebasestorage.app",
  messagingSenderId: "123834160053",
  appId: "1:123834160053:web:dcd475d6fcafe240c03ffc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;