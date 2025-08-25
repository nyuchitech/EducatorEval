// Firebase Configuration
// Replace these values with your actual Firebase project configuration
// To get this configuration, go to Firebase Console > Project Settings > General > Your apps

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.PUBLIC_FIREBASE_API_KEY || "your-api-key-here",
  authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN || "your-project-id.firebaseapp.com",
  projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET || "your-project-id.appspot.com",
  messagingSenderId: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.PUBLIC_FIREBASE_APP_ID || "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);

// Export the app instance
export default app;
