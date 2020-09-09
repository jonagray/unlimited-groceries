import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBbK-Oo2beADz3VqE0tXty5l5U6Iz14neg",
  authDomain: "unlimited-groceries.firebaseapp.com",
  databaseURL: "https://unlimited-groceries.firebaseio.com",
  projectId: "unlimited-groceries",
  storageBucket: "unlimited-groceries.appspot.com",
  messagingSenderId: "926560267700",
  appId: "1:926560267700:web:cf1fdeb61241bec79f16e1",
  measurementId: "G-D3M2QMQ204"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;

// import * as firebase from 'firebase';

// const firebaseConfig = {
//   apiKey: "AIzaSyBbK-Oo2beADz3VqE0tXty5l5U6Iz14neg",
//   authDomain: "unlimited-groceries.firebaseapp.com",
//   databaseURL: "https://unlimited-groceries.firebaseio.com",
//   projectId: "unlimited-groceries",
//   storageBucket: "unlimited-groceries.appspot.com",
//   messagingSenderId: "926560267700",
//   appId: "1:926560267700:web:cf1fdeb61241bec79f16e1",
//   measurementId: "G-D3M2QMQ204"
//   };

//   const app = firebase.initializeApp(firebaseConfig);
//   export const db = app.database();

//   const app = Firebase.initializeApp(firebaseConfig);
// export const db = app.database();