// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBb1DyaDICQaILHz20ZYzjYi8xdDJa9VWA',
    authDomain: 'chat-app-diploma-a5563.firebaseapp.com',
    projectId: 'chat-app-diploma-a5563',
    storageBucket: 'chat-app-diploma-a5563.appspot.com',
    messagingSenderId: '377701281475',
    appId: '1:377701281475:web:f461b637810e14bbfd7c76',
    measurementId: 'G-S03BEBRT3Z'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);