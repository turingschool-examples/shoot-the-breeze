import firebase from 'firebase';

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: ''
};

firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const signIn = () => auth.signInWithPopup(provider);
export const reference = firebase.database().ref('messages');
