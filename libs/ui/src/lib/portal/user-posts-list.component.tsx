import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  orderBy,
  query,
} from 'firebase/firestore';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { IFirestorePostData, db } from '@bloggo/redux';

import { ImageContainer } from '../image';
import { Link } from '../link.component';

type UserPostsListProps = {
  uid?: string;
};

export const UserPostsList: React.FC<UserPostsListProps> = ({ uid }) => {
  const postsRef = collection(db, `/users/${uid ?? ''}/posts`);
  const q = query(postsRef, orderBy('createdAt'));
  const [
    posts = { docs: [] as QueryDocumentSnapshot<DocumentData>[] },
    loading,
    error,
  ] = useCollection(q);

  if (loading) {
    console.log('Loading posts...');
  }
  if (error) {
    console.error(error);
    return <div>Error...</div>;
  }
  return (
    <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
      {posts.docs.length >= 1 ? (
        posts.docs.map((post) => {
          const postData = post.data() as IFirestorePostData;
          return (
            <tr key={post.id}>
              <td className="px-6 py-4">
                <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                  <ImageContainer
                    containerClassName="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14"
                    src={postData.thumbnail}
                  />
                  <div className="ml-4 flex-grow">
                    <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                      <Link
                        href={`/${postData.username}/${postData.slug}`}
                        className=""
                        colorClass=""
                      >
                        {postData.title}
                      </Link>
                    </h2>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {postData.published ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-medium rounded-full bg-teal-100 text-teal-900 lg:text-sm">
                    Published
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-sm text-neutral-500 dark:text-neutral-400 rounded-full">
                    Draft
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-neutral-300">
                <Link
                  href={`/portal/${postData.slug}`}
                  className="text-primary-800 dark:text-primary-500 hover:text-primary-900"
                  colorClass=""
                >
                  Edit
                </Link>
                {` | `}
                <Link
                  href="/#"
                  className="text-rose-600 hover:text-rose-900"
                  colorClass=""
                >
                  Delete
                </Link>
              </td>
            </tr>
          );
        })
      ) : (
        <p className="px-6 py-4">No posts to display</p>
      )}
    </tbody>
  );
};
