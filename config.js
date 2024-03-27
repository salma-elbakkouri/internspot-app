import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBETIeD-kChRoJ23Es3ltjiFKuDQ9lDwPE",
  authDomain: "projet-fin-etudes-8fd33.firebaseapp.com",
  projectId: "projet-fin-etudes-8fd33",
  storageBucket: "projet-fin-etudes-8fd33.appspot.com",
  messagingSenderId: "383408524224",
  appId: "1:383408524224:web:11838f1a9e406eb6221625",
  measurementId: "G-98GECG9D0Q"
};

if (!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig)
}

export { firebase };