// app/lib/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AlzaSyAwPyJpBNOJibA-Y4ChyUHNF7cXYSFSZ0",
  authDomain: "pet-life-journal.firebaseapp.com",
  projectId: "pet-life-journal",
  storageBucket: "pet-life-journal.appspot.com",
  messagingSenderId: "513716064032",
  appId: "1:513716064032:web:2cda8962efbaa0c4d1d145"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

