import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDNotinqdiNETddK4e_MA_rNsz1gkYKChw',
  authDomain: 'bloggo-9fc7d.firebaseapp.com',
  projectId: 'bloggo-9fc7d',
  storageBucket: 'bloggo-9fc7d.appspot.com',
  messagingSenderId: '424368452854',
  appId: '1:424368452854:web:361dd4c39219757306e8d7',
  measurementId: 'G-D2F125TYVK',
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
