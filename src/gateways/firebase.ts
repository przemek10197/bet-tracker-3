import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBREpXDDgSd1yrLhvgsstx9tGWq-yqm4cU',
  authDomain: 'bet-tracker-18e2f.firebaseapp.com',
  projectId: 'bet-tracker-18e2f',
  storageBucket: 'bet-tracker-18e2f.appspot.com',
  messagingSenderId: '917069882022',
  appId: '1:917069882022:web:dab681f8a0bf5755828a67',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
