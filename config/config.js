import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyBSLvtOwLYJ45f4-AwacbZp9PfHoYpfYcU",
//   authDomain: "internspot-app-project.firebaseapp.com",
//   projectId: "internspot-app-project",
//   storageBucket: "internspot-app-project.appspot.com",
//   messagingSenderId: "964331089168",
//   appId: "1:964331089168:web:5b64ff3f0eb719c24f0995",
//   measurementId: "G-PZ02B7H27R"
// };

// // Clone project Config
const firebaseConfig = {
  apiKey: "AIzaSyB8D2h-2l_2VYPBc2pukhKDqvZ4I_Av7Aw",
  authDomain: "internspot-clone.firebaseapp.com",
  projectId: "internspot-clone",
  storageBucket: "internspot-clone.appspot.com",
  messagingSenderId: "733300522093",
  appId: "1:733300522093:web:5fea8a04523f5e7ea41364",
  measurementId: "G-GH3SK8YN61"
};

if (!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig)
}

export { firebase };