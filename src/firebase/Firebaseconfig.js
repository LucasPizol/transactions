import * as firebase from "firebase/app";
import * as fireauth from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBIQCMREEdBU8sYNPegNX6sYsfvNYCWgXY",
  authDomain: "teste-projeto-472e1.firebaseapp.com",
  databaseURL: "https://teste-projeto-472e1-default-rtdb.firebaseio.com",
  projectId: "teste-projeto-472e1",
  storageBucket: "teste-projeto-472e1.appspot.com",
  messagingSenderId: "983502813772",
  appId: "1:983502813772:web:5ec222f636c6f5924c52e9",
  measurementId: "G-K3W22Y29GN"
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = fireauth.getAuth(app, {persistence: fireauth.browserLocalPersistence})
