// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBs3clKZSnqXZ-e4-3bIDmxJX_r60DxqPE',
  authDomain: 'otp-project-70079.firebaseapp.com',
  projectId: 'otp-project-70079',
  storageBucket: 'otp-project-70079.appspot.com',
  messagingSenderId: '515900835044',
  appId: '1:515900835044:web:7d4563627e7f05f91698f1',
  measurementId: 'G-HT94X2YHP9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
