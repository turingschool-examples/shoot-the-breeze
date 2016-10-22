import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAq4A0g659dSpj693sxA00dLN1h5-WXFtg',
  authDomain: 'shoot-the-breeze-b5e3f.firebaseapp.com',
  databaseURL: 'https://shoot-the-breeze-b5e3f.firebaseio.com',
  storageBucket: 'shoot-the-breeze-b5e3f.appspot.com',
  messagingSenderId: '875296030588'
};

firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const signIn = () => auth.signInWithPopup(provider);
export const reference = firebase.database().ref('messages');
export const currUser = firebase.database().ref('currUser');
