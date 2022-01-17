import {
  DocumentData,
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';

import { docToJSON } from './helpers';

const db = getFirestore();

/**`
 * Checks if a username doc exists in the database.
 * @param  {string} username
 */
export const checkUsername = async (username: string) => {
  const usernameDoc = await getDoc(doc(db, 'users', username));
  return usernameDoc.exists();
};

/**`
 * Batch creates the username and the user entries in the database.
 * @param  {Record<string,string>} user_payload
 */
export const createUsernameWithUserData = async ({
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

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export const getUserDataFromUsername = async (username: string | string[]) => {
  const usersRef = collection(db, 'users');

  const q = query(usersRef, where('username', '==', username), limit(1));
  const querySnapshot = await getDocs(q);
  const [userDoc] = querySnapshot.docs;
  return userDoc;
};

/**`
 * Get the last post_limit posts from a user given the user document reference.
 * @param  {DocumentReference<DocumentData>} userDocRef
 * @param  {number} postCount
 */
export const getUserPostsWithLimit = async (
  userDocRef: DocumentReference<DocumentData>,
  postCount: number,
) => {
  const postsRef = collection(userDocRef, 'posts');
  const q = query(
    postsRef,
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(postCount),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docToJSON);
};
