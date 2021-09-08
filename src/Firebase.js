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

initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider(process.env.REACT_APP_APP_CHECK_PUBLIC_KEY),
  isTokenAutoRefreshEnabled: true,
});

export default firebaseApp;
