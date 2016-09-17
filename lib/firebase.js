import firebase from 'firebase';

  const config = {
    apiKey: "AIzaSyBY8xv54vU1GVGRa0eKtpdno9aOssAvQdc",
    authDomain: "shoot-the-breeze-53743.firebaseapp.com",
    databaseURL: "https://shoot-the-breeze-53743.firebaseio.com",
    storageBucket: "shoot-the-breeze-53743.appspot.com",
    messagingSenderId: "224996484461"
  };

firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const signIn = () => auth.signInWithPopup(provider);
export const reference = firebase.database().ref('messages');
