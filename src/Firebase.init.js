
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA9C-os7poEqqYaSgXmXxld09yQj2n9ATw",
  authDomain: "car-inventory-7c113.firebaseapp.com",
  projectId: "car-inventory-7c113",
  storageBucket: "car-inventory-7c113.appspot.com",
  messagingSenderId: "463644814441",
  appId: "1:463644814441:web:4edb480d8a5d54977946f8",
  measurementId: "G-4M2RQE7PRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app)
export default auth;