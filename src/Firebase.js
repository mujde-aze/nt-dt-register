import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
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

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

if (!process.env.REACT_APP_DEV_MODE) {
  // eslint-disable-next-line no-unused-vars
  const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(process.env.RE),
    isTokenAutoRefreshEnabled: true,
  });
}

export default app;
