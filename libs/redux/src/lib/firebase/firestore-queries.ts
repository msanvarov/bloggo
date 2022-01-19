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
  setDoc,
  startAfter,
  where,
  writeBatch,
} from 'firebase/firestore';

import { IFirestorePostData, IFirestorePostPayload } from '.';
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
    createdAt: Timestamp.now(),
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
 * Get the last usernameLimit username ordered by createdAt date.
 * @param  {number} usersLimit
 */
export const getUsernamesOrderedByDateWithLimit = async (
  usernameLimit: number,
) => {
  const ref = collection(db, 'usernames');
  const q = query(ref, orderBy('createdAt', 'desc'), limit(usernameLimit));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      username: doc.id,
      createdAt: data.createdAt.toMillis(),
    };
  });
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
    orderBy('likes', 'desc'),
    limit(postLimit),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docToJSON);
};

// TODO: fix architecture so that the slug field and document id aren't bound together. A post document id should be unique and slugs should be its own collection that maps to it.

/**`
 * Get a post by its document id (slug) for a specific user given the userPath.
 * @param  {string} userPath
 * @param  {string} slug
 */
export const getPostBySlugForUser = async (
  userPath: string,
  slug: string | string[],
) => {
  const ref = doc(db, userPath, 'posts', Array.isArray(slug) ? slug[0] : slug);
  const docSnapshot = await getDoc(ref);
  console.log(docSnapshot.data());
  return [ref.path, docToJSON(docSnapshot)] as const;
};

// TODO: move this to the admin sdk for better performance
/**`
 * Get posts
 */
export const getPostPaths = async () => {
  const ref = collectionGroup(db, 'posts');
  const querySnapshot = await getDocs(ref);
  return querySnapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });
};

/**`
 * Create a post for a user given the userId and post id (slug).
 *
 * @param  {string} userId
 * @param  {string} slug
 * @param  {IFirestorePostPayload} postPayload
 */
export const createPost = async (
  userId: string,
  slug: string,
  postPayload: IFirestorePostPayload,
) => {
  const ref = doc(db, 'users', userId, 'posts', slug);
  return await setDoc(ref, postPayload);
};
