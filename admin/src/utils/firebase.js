import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "fullstack-blog-app-b0ac2.firebaseapp.com",
  projectId: "fullstack-blog-app-b0ac2",
  storageBucket: "fullstack-blog-app-b0ac2.appspot.com",
  messagingSenderId: "1038252361509",
  appId: "1:1038252361509:web:eb8b16ce44e3dbd3407ccc",
};

export const app = initializeApp(firebaseConfig);
