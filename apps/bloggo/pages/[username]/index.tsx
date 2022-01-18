import classnames from 'classnames';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import {
  IFirestorePostData,
  IFirestoreUserData,
  getUserDataFromUsername,
  getUserPostsWithLimit,
} from '@bloggo/redux';
import {
  AppLayout,
  Avatar,
  Button,
  ImageContainer,
  Metatags,
  PostFilterListBox,
  PostPreviewCard,
} from '@bloggo/ui';

interface UserProfilePageProps {
  user: IFirestoreUserData;
  posts: IFirestorePostData[];
}

export const getServerSideProps: GetServerSideProps<
  UserProfilePageProps
> = async ({ query }) => {
  const { username } = query;
  const userDoc = await getUserDataFromUsername(username);

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let user: IFirestoreUserData = null;
  let posts: IFirestorePostData[] = null;

  if (userDoc) {
    user = userDoc.data() as IFirestoreUserData;
    posts = (await getUserPostsWithLimit(
      userDoc.ref,
      6,
    )) as IFirestorePostData[];
  }

  // will be passed to the page component as props
  return {
    props: {
      user,
      posts,
    },
  };
};

const UserProfilePage: React.FC<UserProfilePageProps> = ({ user, posts }) => {
  return (
    <>
      <Metatags title={`Profile ${user.username}`} />
      <AppLayout basicLayout>
        <section className="w-screen px-2 xl:max-w-screen-2xl mx-auto">
          <div className="rounded-3xl relative aspect-w-16 aspect-h-16 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-7 overflow-hidden">
            <ImageContainer
              containerClassName="absolute inset-0"
              src="https://images.pexels.com/photos/261579/pexels-photo-261579.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="relative container -mt-20 lg:-mt-48">
            <div className=" bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-16 rounded-[40px] shadow-2xl flex flex-col sm:flex-row sm:items-center">
              <Avatar
                containerClassName="ring-4 ring-white dark:ring-0 shadow-2xl"
                src={user.photoURL}
                sizeClass="w-20 h-20 text-xl lg:text-2xl lg:w-36 lg:h-36"
                radius="rounded-full"
              />
              <div className="mt-5 sm:mt-0 sm:ml-8 space-y-4 max-w-lg">
                <h2 className="inline-block text-2xl sm:text-3xl md:text-4xl font-semibold">
                  {user.displayName}
                </h2>
                <span className="block text-sm text-neutral-6000 dark:text-neutral-300 md:text-base">
                  @{user.username}
                  {/* TODO: description for each user */}
                </span>
                {/* <SocialsList /> */}
              </div>
            </div>
          </div>
        </section>
        <section className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
          <Tabs>
            {/* tabs */}
            <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
              <TabList className="flex sm:space-x-2">
                <Tab className="relative">
                  <button
                    className={classnames(
                      'block !leading-none font-medium',
                      'px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize',
                      'rounded-full',
                      'text-neutral-500 dark:text-neutral-100 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800',
                      'focus:outline-none',
                    )}
                  >
                    Posts
                  </button>
                </Tab>
                <Tab className="relative">
                  <button
                    className={classnames(
                      'block !leading-none font-medium',
                      'px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize',
                      'rounded-full',
                      'text-neutral-500 dark:text-neutral-100 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800',
                      'focus:outline-none',
                    )}
                  >
                    Favourites
                  </button>
                </Tab>
              </TabList>
              <div className="block my-4 border-b w-full border-neutral-100 sm:hidden" />
              <div className="flex justify-end">
                <PostFilterListBox />
              </div>
            </div>

            {/* tab panels */}

            <TabPanel>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
                {posts.map((post, index) => (
                  <PostPreviewCard key={index} {...{ post, author: user }} />
                ))}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
                <h2>Any content 2</h2>
              </div>
            </TabPanel>

            {/* pagination */}
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              <div className={`inline-flex space-x-1 text-base font-medium`}>
                <span>1-6 of {posts.length} posts</span>
                {/* <span
                className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white focus:outline-none`}
              >
                1
              </span> */}
              </div>
              {posts.length > 6 && <Button primary>Load more...</Button>}
            </div>
          </Tabs>
        </section>
      </AppLayout>
    </>
  );
};

export default UserProfilePage;
