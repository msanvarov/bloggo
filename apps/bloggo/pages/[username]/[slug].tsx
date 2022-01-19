import { doc } from 'firebase/firestore';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import {
  AppState,
  IFirestorePostData,
  db,
  getPostBySlugForUser,
  getPostPaths,
  getUserDataFromUsername,
  useAppSelector,
} from '@bloggo/redux';
import {
  AppLayout,
  BadgeList,
  ImageContainer,
  Metatags,
  PostContent,
  PostEntryMetadata,
} from '@bloggo/ui';

interface UserPostPageProps {
  path: string;
  post: IFirestorePostData;
}

export const getStaticProps: GetStaticProps<UserPostPageProps> = async ({
  params,
}) => {
  const { username, slug } = params;
  const userDoc = await getUserDataFromUsername(username);

  let post: IFirestorePostData;
  let path: string;

  if (userDoc) {
    const [postPath, postData] = await getPostBySlugForUser(
      userDoc.ref.path,
      slug,
    );
    post = postData as IFirestorePostData;
    path = postPath;
  }

  return {
    props: { post, path },
    revalidate: 100,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: move to firebase function
  const paths = await getPostPaths();
  return {
    // must be in this format:
    // paths: [
    //   { params: { username, slug }}
    // ],
    paths,
    fallback: 'blocking',
  };
};

const UserPost: React.FC<UserPostPageProps> = ({ path, post }) => {
  const { user } = useAppSelector((state: AppState) => state.user);
  const postRef = doc(db, path);
  const [realtimePost] = useDocumentData(postRef);

  // Returns the staticly generated post or the hydrated post from firebase
  const postData = realtimePost || post;
  console.log(postData);
  return (
    <>
      <Metatags title={postData.title} />
      <AppLayout basicLayout>
        <section className="pt-8 lg:pt-16">
          <header className="container rounded-xl">
            {/*  HEADER */}

            <div className="max-w-screen-md mx-auto">
              <div className="space-y-5">
                <BadgeList badgeClassName="!px-3" />
                <h1 className="text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 max-w-4xl">
                  {postData.title}
                </h1>
                {postData.description && (
                  <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
                    {postData.description}
                  </span>
                )}
                <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
                  <PostEntryMetadata
                    size="large"
                    className="leading-none flex-shrink-0"
                    meta={{
                      author: {
                        username: postData.username,
                      },
                      readingTime: '6 min read',
                      date: postData.updatedAt,
                    }}
                    avatarRounded="rounded-full shadow-inner"
                  />
                  <section>
                    <div className="flex flex-row space-x-2.5 items-center">
                      {/* Like and Comment buttons */}
                      <div className="px-1">
                        <div className="border-l border-neutral-200 dark:border-neutral-700 h-6" />
                      </div>

                      {/* Bookmark button */}
                      {/* Share buttons */}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </header>
          <ImageContainer
            containerClassName="container my-10 sm:my-12"
            className="object-cover w-full h-full rounded-xl"
            src="https://images.pexels.com/photos/4050347/pexels-photo-4050347.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            prevImageHorizontal
          />
          <div className="container">
            <PostContent content={post.content} />
          </div>
        </section>
      </AppLayout>
    </>
  );
};

export default UserPost;
