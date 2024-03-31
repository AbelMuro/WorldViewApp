import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app, 'gs://world-tube-1de8d.appspot.com'); 