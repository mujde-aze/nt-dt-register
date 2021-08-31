import {initializeApp} from "firebase/app";
const {initializeAppCheck, ReCaptchaV3Provider} = require("firebase/app-check");

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

if (!process.env.REACT_APP_DEV_MODE) {
  // eslint-disable-next-line no-unused-vars
  const appCheck = initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider(process.env.RE),
    isTokenAutoRefreshEnabled: true,
  });
}

export default firebaseApp;
