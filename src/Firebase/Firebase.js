import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCui1BCDp8btSWEPzOnk67an2e5VWAih8A",
  authDomain: "world-tube-1de8d.firebaseapp.com",
  projectId: "world-tube-1de8d",
  storageBucket: "world-tube-1de8d.appspot.com",
  messagingSenderId: "400279370588",
  appId: "1:400279370588:web:2662c22bf129e4556f5f99",
  measurementId: "G-VHD8ES0264"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app, 'gs://world-tube-1de8d.appspot.com'); 