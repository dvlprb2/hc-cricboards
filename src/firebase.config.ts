import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDVJBccG4pNgC2u0e0ogxCbYcpZGxntzEc',
  authDomain: 'cricboards-47.firebaseapp.com',
  projectId: 'cricboards-47',
  storageBucket: 'cricboards-47.appspot.com',
  messagingSenderId: '568762015069',
  appId: '1:568762015069:web:388d9833afa0eb03609cb4',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
