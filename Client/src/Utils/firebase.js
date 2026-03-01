import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAqXsPp0EzwTChggGNGZJ1659SyakrNK2I",
  authDomain: "the-newsmania.firebaseapp.com",
  projectId: "the-newsmania",
  storageBucket: "the-newsmania.firebasestorage.app",
  messagingSenderId: "532742078286",
  appId: "1:532742078286:web:6d3d4b61b6d2e35d14281f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);