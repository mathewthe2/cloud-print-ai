import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAQqP5EPTEXRIzxR1I9VmEDdxez1T8OCdI", // exposing this key is safe as scope is limited to this project
  authDomain: "poised-octane-449005-q1.firebaseapp.com",
  projectId: "poised-octane-449005-q1",
  storageBucket: "poised-octane-449005-q1.firebasestorage.app",
  messagingSenderId: "270802040829",
  appId: "1:270802040829:web:fcfe5fbd2653bc40b04b94",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
