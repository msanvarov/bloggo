import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { auth } from './firebase';

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogleProvider = async () => {
  const provider = new GoogleAuthProvider();
  const authResponse = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(authResponse);
  const token = credential.accessToken;
  console.log(token);
  return authResponse.user;
};

export const register = async (
  username: string,
  email: string,
  password: string,
) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);

  updateProfile(user, {
    displayName: username,
    photoURL: `https://ui-avatars.com/api/?name=${username}`,
  });

  return user;
};

export const logout = async () => {
  return await signOut(auth);
};
