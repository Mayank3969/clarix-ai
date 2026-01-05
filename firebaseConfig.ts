
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO-RWw70oZWllgSkaPQLjBJGSPK9pV-Fw",
  authDomain: "clarix-ai.firebaseapp.com",
  projectId: "clarix-ai",
  storageBucket: "clarix-ai.firebasestorage.app",
  messagingSenderId: "169752936916",
  appId: "1:169752936916:web:dc2b02ce694962217b9641",
  measurementId: "G-NNH3YN88K5"
};

// 1. Initialize App
const app = initializeApp(firebaseConfig);

// 2. Initialize Firestore
// Using standard initialization for better compatibility
const db = getFirestore(app);

// 3. Initialize Authentication
const auth = getAuth(app);

// 4. Initialize Realtime Database
// Used for low-latency features like live vote counts, presence, or chat indicators.
const rtdb = getDatabase(app);

// 5. Initialize Cloud Storage
// Buckets configured for user content and code snapshots.
const storage = getStorage(app);

// Export named instances
export { app, auth, db, rtdb, storage };
