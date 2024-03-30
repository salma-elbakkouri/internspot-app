import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBSLvtOwLYJ45f4-AwacbZp9PfHoYpfYcU",
  authDomain: "internspot-app-project.firebaseapp.com",
  projectId: "internspot-app-project",
  storageBucket: "internspot-app-project.appspot.com",
  messagingSenderId: "964331089168",
  appId: "1:964331089168:web:5b64ff3f0eb719c24f0995",
  measurementId: "G-PZ02B7H27R"
};

if (!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig)
}

export { firebase };