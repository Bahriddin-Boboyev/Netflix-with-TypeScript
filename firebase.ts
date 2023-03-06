// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBnr4c6zIycDVLArxx79PlOg07k9dNKffc',
  authDomain: 'netlfix-clone-87c0e.firebaseapp.com',
  projectId: 'netlfix-clone-87c0e',
  storageBucket: 'netlfix-clone-87c0e.appspot.com',
  messagingSenderId: '301152616626',
  appId: '1:301152616626:web:26a59597ca00740d5e49ab',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
