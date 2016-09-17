import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBzkFjqmxD0-SfMq805aGhNkg2e9IvRiSo",
  authDomain: "shoot-the-breeze-b1ff1.firebaseapp.com",
  databaseURL: "https://shoot-the-breeze-b1ff1.firebaseio.com",
  storageBucket: "shoot-the-breeze-b1ff1.appspot.com",
  messagingSenderId: "1014976638269"
};
firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const signIn = () => auth.signInWithPopup(provider);
export const reference = firebase.database().ref('messages');
