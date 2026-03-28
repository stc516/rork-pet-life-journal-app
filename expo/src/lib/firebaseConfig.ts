import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AlzaSyAwPyJpBNOJibA-Y4ChyYUHNF7cXYSFSZ0',
  authDomain: 'pet-life-journal.firebaseapp.com',
  projectId: 'pet-life-journal',
  storageBucket: 'pet-life-journal.appspot.com',
  messagingSenderId: '513716064032',
  appId: '1:513716064032:web:2cda8962efbaa0c4d1d145',
};

export const app = initializeApp(firebaseConfig);
