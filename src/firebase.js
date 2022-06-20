import firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBKWjg0CUQU-IK9gTvvR2tBOaOsVR1ApLk",
    authDomain: "discord-clone-58655.firebaseapp.com",
    projectId: "discord-clone-58655",
    storageBucket: "discord-clone-58655.appspot.com",
    messagingSenderId: "1025449092813",
    appId: "1:1025449092813:web:d7d2f5beb5aef85826eb84",
    measurementId: "G-M01RPPVXX9"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();


  export {auth, provider};
  export default db;
  