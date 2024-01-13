import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCnBoPgA_V4e3Ke713mYWbKUNW3KAUjmmc",
  authDomain: "assignment-f3f3c.firebaseapp.com",
  projectId: "assignment-f3f3c",
  storageBucket: "assignment-f3f3c.appspot.com",
  messagingSenderId: "1035547286415",
  appId: "1:1035547286415:web:00bfe6b202a6a2041109fa",
  measurementId: "G-HGRD1Z105H"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app,"gs://spotify-e0ba6.appspot.com/");
export default storage;
