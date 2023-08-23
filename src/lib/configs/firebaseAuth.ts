import {
  GoogleAuthProvider,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';

import { apiKey, auth } from './firebase';

export async function signUpUser(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInUser(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  return signInWithPopup(auth, provider);
}

export function sendResetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

export function resetPassword(key: string, code: string, newPassword: string) {
  if(key !== apiKey) throw new Error('Invalid API key');
  return confirmPasswordReset(auth, code, newPassword);
}