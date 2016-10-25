import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB1YzJRKZs6U8pz9DMB5CpUZimGpIdqXwo',
  authDomain: 'shoot-the-breeze-1be68.firebaseapp.com',
  databaseURL: 'https://shoot-the-breeze-1be68.firebaseio.com',
  storageBucket: 'shoot-the-breeze-1be68.appspot.com',
  messagingSenderId: '20778908996'
};

firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const signIn = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export const reference = firebase.database().ref('messages');
