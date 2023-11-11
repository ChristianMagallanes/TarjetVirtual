// AuthService.js

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/FirebaseConfig';

const authenticateAdmin = async (email, password) => {
  try {
    // Autenticar con Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error de autenticación:', error.message);
    throw error;
  }
};

export { authenticateAdmin };
