import { doc, getDoc } from 'firebase/firestore';

import { db } from './index';

export const checkUsername = async (username: string) => {
  const usernameDoc = await getDoc(doc(db, 'users', username));
  return usernameDoc.exists();
};
