import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
let firebaseConfig = {
  apiKey: 'AIzaSyBNEZz0NSYRmjQPZJzgdlizAzwHT_lje5k',
  authDomain: 'fitness-breks.firebaseapp.com',
  databaseURL: 'https://fitness-breks.firebaseio.com',
  projectId: 'fitness-breks',
  storageBucket: 'fitness-breks.appspot.com',
  messagingSenderId: '757624077420',
  appId: '1:757624077420:web:50754969f1bfae2a4b6c49',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
     const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
     }, reject);
  });
}

export const db = firebase.firestore();

