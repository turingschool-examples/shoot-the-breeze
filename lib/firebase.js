const firebase = require ('firebase')

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: '',
};

firebase.intializeApp(config)

module.exports = firebase
