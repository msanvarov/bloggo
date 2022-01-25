import { getApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDNotinqdiNETddK4e_MA_rNsz1gkYKChw',
  authDomain: 'bloggo-9fc7d.firebaseapp.com',
  projectId: 'bloggo-9fc7d',
  storageBucket: 'bloggo-9fc7d.appspot.com',
  messagingSenderId: '424368452854',
  appId: '1:424368452854:web:361dd4c39219757306e8d7',
  measurementId: 'G-D2F125TYVK',
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
