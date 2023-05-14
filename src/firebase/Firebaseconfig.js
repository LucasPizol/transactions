import * as firebase from "firebase/app";
import * as fireauth from "firebase/auth"

const firebaseConfig = {
  //firebase-config
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = fireauth.getAuth(app, {persistence: fireauth.browserLocalPersistence})
