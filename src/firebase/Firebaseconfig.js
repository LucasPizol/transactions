import * as firebase from "firebase/app";
import * as fireauth from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBHvUB52l74X1PDfNukv_Nm2pJtzYBbISs",
  authDomain: "projeto-login-d13cf.firebaseapp.com",
  databaseURL: "https://projeto-login-d13cf-default-rtdb.firebaseio.com",
  projectId: "projeto-login-d13cf",
  storageBucket: "projeto-login-d13cf.appspot.com",
  messagingSenderId: "229310967849",
  appId: "1:229310967849:web:1c43ce6b3c1a09d9c1ac38",
  measurementId: "G-C4LSWCY1N9"
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = fireauth.getAuth(app, {persistence: fireauth.browserLocalPersistence})
