import {
  GoogleAuthProvider,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateEmail,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { apiKey, auth, storage } from './firebase';

export async function signUpUser(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInUser(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logOutUser() {
  return auth.signOut();
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
  if (key !== apiKey) throw new Error('Invalid API key');
  return confirmPasswordReset(auth, code, newPassword);
}

export async function updateProfileUser(
  email: string,
  displayName: string,
  photoURL: File | string
) {
  let imageUrl = '';
  if (typeof photoURL !== 'string') {
    const imageRef = ref(
      storage,
      `images/${photoURL?.name + Date.now().toString()}`
    );
    const result = await uploadBytes(imageRef, photoURL);
    imageUrl = await getDownloadURL(result.ref);
  } else {
    imageUrl = photoURL;
  }
  if (auth.currentUser)
    return Promise.all([
      updateProfile(auth.currentUser, { displayName, photoURL: imageUrl }),
      updateEmail(auth.currentUser, email),
    ]);
  return null;
}

export async function removeUser() {
  if (auth.currentUser) {
    return auth.currentUser.delete();
  }
  return Promise.reject('User are not signed in!');
}

export async function sendVerificationEmail() {
  if (auth?.currentUser) {
    return sendEmailVerification(auth.currentUser);
  }

  return Promise.reject('User are not signed in!');
}
