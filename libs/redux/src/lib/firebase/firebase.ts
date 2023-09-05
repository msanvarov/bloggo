import { getApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey:
    process.env.FIREBASE_API_KEY ?? 'AIzaSyDNotinqdiNETddK4e_MA_rNsz1gkYKChw',
  authDomain:
    process.env.FIREBASE_AUTH_DOMAIN ?? 'bloggo-9fc7d.firebaseapp.com',
  projectId: process.env.FIREBASE_PROJECT_ID ?? 'bloggo-9fc7d',
  storageBucket:
    process.env.FIREBASE_STORAGE_BUCKET ?? 'bloggo-9fc7d.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ?? '424368452854',
  appId:
    process.env.FIREBASE_APP_ID ?? '1:424368452854:web:361dd4c39219757306e8d7',
  measurementId: process.env.FIREBASE_MEASUREMENT_ID ?? 'G-D2F125TYVK',
};

export const initializeFirebase = () => {
  try {
    return getApp();
  } catch (e) {
    return initializeApp(firebaseConfig);
  }
};

const app = initializeFirebase();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const STATE_CHANGED = 'state_changed';
