// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNe8XJwAX7Cgkcf6fyZ1FUxLX4BF3khBA",
    authDomain: "anki-5c921.firebaseapp.com",
    projectId: "anki-5c921",
    storageBucket: "anki-5c921.appspot.com",
    messagingSenderId: "882352762459",
    appId: "1:882352762459:web:31e145dd4b7bb068cd197e",
    measurementId: "G-RESNY93SSM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
