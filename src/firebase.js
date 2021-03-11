import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBxsfJYFywJ4piqMVK0pNl5qH7cRzDY6K4",
    authDomain: "socialm-dbeff.firebaseapp.com",
    projectId: "socialm-dbeff",
    storageBucket: "socialm-dbeff.appspot.com",
    messagingSenderId: "592305759417",
    appId: "1:592305759417:web:6ed644e71e11d6dd496768"
  };

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();  
const auth=firebase.auth();
const storage=firebase.storage();
const provider= new firebase.auth.GoogleAuthProvider();

export {db,auth,storage,provider};