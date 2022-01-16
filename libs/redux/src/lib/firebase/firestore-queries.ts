import { doc, getDoc, writeBatch } from 'firebase/firestore';

import { db } from './index';

export const checkUsername = async (username: string) => {
  const usernameDoc = await getDoc(doc(db, 'users', username));
  return usernameDoc.exists();
};

export const createUsernameAndLinkToUser = async ({
  uid,
  username,
  displayName,
  photoURL,
}: {
  uid: string;
  username: string;
  photoURL?: string;
  displayName?: string;
}) => {
  // displayName can be the users name when they sign up with Google. Or it can be their username.
  const batch = writeBatch(db);
  batch.set(doc(db, 'users', uid), {
    username,
    photoURL: photoURL,
    displayName: displayName || username,
  });
  batch.set(doc(db, 'usernames', username), { uid });
  return await batch.commit();
};
