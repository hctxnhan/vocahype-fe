import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateEmail,
  updateProfile
} from 'firebase/auth';
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

import { auth, storage } from './firebase';

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
