import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD1FsnfITgJIzalR8AE7PCfFfCCZnAYLFo",
    authDomain: "shoot-the-breeze-74af7.firebaseapp.com",
    databaseURL: "https://shoot-the-breeze-74af7.firebaseio.com",
    storageBucket: "shoot-the-breeze-74af7.appspot.com",
    messagingSenderId: "178370758408"
};

firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const signIn = () => auth.signInWithPopup(provider);
export const reference = firebase.database().ref('messages');
