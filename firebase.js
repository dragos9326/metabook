import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkv-mnM-TExfD0-sZFfWZ5GezVRln-hx8",
  authDomain: "metabook-da14c.firebaseapp.com",
  projectId: "metabook-da14c",
  storageBucket: "metabook-da14c.appspot.com",
  messagingSenderId: "435025220862",
  appId: "1:435025220862:web:64f98d6d7cdfa9824141af",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
