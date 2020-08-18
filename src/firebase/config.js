import Firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBe45eMhnKcjGHfrqkITB9NiuSuGY_OqFU",
  authDomain: "grocery-list-58996.firebaseapp.com",
  databaseURL: "https://grocery-list-58996.firebaseio.com",
  projectId: "grocery-list-58996",
  storageBucket: "grocery-list-58996.appspot.com",
  messagingSenderId: "233914142664",
  appId: "1:233914142664:web:4bee2954a5bb9c7047fafd",
  measurementId: "G-2P6YWVDWJH"
  };

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();