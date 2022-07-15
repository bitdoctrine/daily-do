import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDTef_qGqKTuhU7MMOnSKdMfbKMvCuis9M',
  authDomain: 'daily-do-f97f3.firebaseapp.com',
  projectId: 'daily-do-f97f3',
  storageBucket: 'daily-do-f97f3.appspot.com',
  messagingSenderId: '799299504899',
  appId: '1:799299504899:web:c61bed7817de0218e6f736',
};

firebase.initializeApp(firebaseConfig);

//init services

const storage = firebase.firestore();
const auth = firebase.auth();
const projectStorage = firebase.storage();

//timestamp function
const timestamp = firebase.firestore.Timestamp;

export { storage, auth, projectStorage, timestamp };
