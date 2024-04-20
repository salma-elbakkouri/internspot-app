import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, initializeAuth, getReactNativePersistence, createUserWithEmailAndPassword, sendEmailVerification as sendVerificationEmail, signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyBSLvtOwLYJ45f4-AwacbZp9PfHoYpfYcU",
//   authDomain: "internspot-app-project.firebaseapp.com",
//   projectId: "internspot-app-project",
//   storageBucket: "internspot-app-project.appspot.com",
//   messagingSenderId: "964331089168",
//   appId: "1:964331089168:web:5b64ff3f0eb719c24f0995",
//   measurementId: "G-PZ02B7H27R"
// };

// Clone project Config
const firebaseConfig = {
  apiKey: "AIzaSyB8D2h-2l_2VYPBc2pukhKDqvZ4I_Av7Aw",
  authDomain: "internspot-clone.firebaseapp.com",
  projectId: "internspot-clone",
  storageBucket: "internspot-clone.appspot.com",
  messagingSenderId: "733300522093",
  appId: "1:733300522093:web:5fea8a04523f5e7ea41364",
  measurementId: "G-GH3SK8YN61"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Define sendEmailVerification function
const sendEmailVerification = async (user) => {
  try {
    await sendVerificationEmail(user); // Use renamed function
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending verification email:', error.message);
  }
};

export { db, auth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword }; // Export signInWithEmailAndPassword along with auth