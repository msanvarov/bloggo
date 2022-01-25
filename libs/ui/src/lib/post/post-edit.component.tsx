import { doc } from 'firebase/firestore';
import React from 'react';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';

import { IFirestorePostData, db } from '@bloggo/redux';

import { BadgeList } from '../badge';
import { ImageContainer } from '../image';
import { PostForm } from './post-form.component';

type PostEditProps = {
  className?: string;
  uid: string;
  slug: string | string[];
};

export const PostEdit: React.FC<PostEditProps> = ({ uid, slug }) => {
  // TODO: cleanup
  const postRef = doc(db, `users/${uid}/posts/${slug}`);
  const [post] = useDocumentDataOnce(postRef);
  return post ? (
    <>
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto">
          <div className="space-y-5">
            <BadgeList badgeClassName="!px-3" />
            <h1 className="text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 max-w-4xl">
              {post['title']}
            </h1>
            {post['description'] && (
              <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
                {post['description']}
              </span>
            )}
            <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          </div>
        </div>
      </header>
      <ImageContainer
        containerClassName="container my-10 sm:my-12"
        className="object-cover w-full h-full rounded-xl"
        src={
          post['thumbnail'] ||
          'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
        }
        prevImageHorizontal
      />
      <div className="container">
        <PostForm
          postRef={postRef}
          defaultValues={post as Data<IFirestorePostData>}
        />
      </div>
    </>
  ) : (
    <p>Post couldn't be found...</p>
  );
};
