import { DocumentSnapshot, Timestamp } from 'firebase/firestore';

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export const docToJSON = (doc: DocumentSnapshot) => {
  const data = doc.data();
  if (data) {
    return {
      ...data,
      // TIMESTAMP is not JSON serializable. Must be converted to milliseconds
      createdAt: data.createdAt.toMillis(),
      updatedAt: data.updatedAt.toMillis(),
    };
  } else {
    return null;
  }
};

export const fromMillis = Timestamp.fromMillis;
