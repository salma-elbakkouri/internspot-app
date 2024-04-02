import { auth } from './config/firebase'; // Import Firebase auth

const checkIfUserAuthenticated = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe(); // Unsubscribe after the initial check
      
      if (user) {
        // User is signed in
        resolve(user);
      } else {
        // No user is signed in
        resolve(null);
      }
    }, reject); // Pass reject function to handle any errors
  });
};

export default checkIfUserAuthenticated;
