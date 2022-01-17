import {
  DocumentData,
  DocumentReference,
  Timestamp,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
  writeBatch,
} from 'firebase/firestore';

import { db } from './firebase';
import { docToJSON } from './helpers';

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
 * Get the last postLimit posts by the user given the user document reference.
 * @param  {DocumentReference<DocumentData>} userDocRef
 * @param  {number} postLimit
 */
export const getUserPostsWithLimit = async (
  userDocRef: DocumentReference<DocumentData>,
  postLimit: number,
) => {
  const postsRef = collection(userDocRef, 'posts');
  const q = query(
    postsRef,
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(postLimit),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docToJSON);
};

/**`
 * Get the last postLimit posts ordered by createdAt date.
 * @param  {number} postLimit
 */
export const getPostsWithLimit = async (postLimit: number) => {
  const ref = collectionGroup(db, 'posts');
  const q = query(
    ref,
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    limit(postLimit),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docToJSON);
};

/**`
 * Get the last postLimit posts ordered by createdAt date.
 * @param  {number} postLimit
 * @param  {number} startingAt
 */
export const getPostsWithLimitStartingAt = async (
  postLimit: number,
  startingAt: Timestamp,
) => {
  const ref = collectionGroup(db, 'posts');
  const q = query(
    ref,
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    startAfter(startingAt),
    limit(postLimit),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docToJSON);
};

/**`
 * Get the last postLimit posts ordered by like count.
 * @param  {number} postLimit
 */
export const getPostsByLikesWithLimit = async (postLimit: number) => {
  const ref = collectionGroup(db, 'posts');
  const q = query(
    ref,
    where('published', '==', true),
    orderBy('likeCount', 'desc'),
    limit(postLimit),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docToJSON);
};
