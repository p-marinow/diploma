import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBb1DyaDICQaILHz20ZYzjYi8xdDJa9VWA',
    authDomain: 'chat-app-diploma-a5563.firebaseapp.com',
    projectId: 'chat-app-diploma-a5563',
    storageBucket: 'chat-app-diploma-a5563.appspot.com',
    messagingSenderId: '377701281475',
    appId: '1:377701281475:web:f461b637810e14bbfd7c76',
    measurementId: 'G-S03BEBRT3Z'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();