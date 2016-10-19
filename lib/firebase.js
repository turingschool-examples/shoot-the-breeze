import firebase from 'firebase';

const config = {
  // Initialize Firebase
    apiKey: "AIzaSyAylAr1Rr3Dc1D_w0fwknlWy6YZloRCl1c",
    authDomain: "shoot-the-breeze-b2fe6.firebaseapp.com",
    databaseURL: "https://shoot-the-breeze-b2fe6.firebaseio.com",
    storageBucket: "shoot-the-breeze-b2fe6.appspot.com",
    messagingSenderId: "738779167102"

};
firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const signIn = () => auth.signInWithPopup(provider);
export const reference = firebase.database().ref('messages');
