// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAwPyJpBNOJibA-Y4ChyYUHNf7cXYSFSZ0",
  authDomain: "pet-life-journal.firebaseapp.com",
  projectId: "pet-life-journal",
  storageBucket: "pet-life-journal.appspot.com",
  messagingSenderId: "513716064032",
  appId: "1:513716064032:web:2cda8962efbaa0c4d1d145",
  measurementId: "G-FW5123D9LS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
