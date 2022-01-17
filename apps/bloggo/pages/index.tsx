import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';

import {
  IFirestorePostData,
  fromMillis,
  getPostsByLikesWithLimit,
  getPostsWithLimit,
  getPostsWithLimitStartingAt,
} from '@bloggo/redux';
import { AppLayout, Loader, MostPopularPostsSlider } from '@bloggo/ui';

interface IndexPageProps {
  latestPosts: IFirestorePostData[];
  mostLikedPosts: IFirestorePostData[];
}

// Max post to query per page
const LIMIT = 10;

export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const [latestPosts, mostLikedPosts] = await Promise.all([
    getPostsWithLimit(LIMIT),
    getPostsByLikesWithLimit(3),
  ]);

  return {
    props: {
      latestPosts: latestPosts as IFirestorePostData[],
      mostLikedPosts: mostLikedPosts as IFirestorePostData[],
    },
  };
};

const Index: React.FC<IndexPageProps> = ({ latestPosts, mostLikedPosts }) => {
  const [postsOrderedByDate, setPostsOrderedByDate] =
    useState<IFirestorePostData[]>(latestPosts);
  const [loading, setLoading] = useState<boolean>(false);
  const [postsEnd, setPostsEnd] = useState<boolean>(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = postsOrderedByDate[postsOrderedByDate.length - 1];

    const cursor =
      typeof last.createdAt === 'number'
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const newPosts = await getPostsWithLimitStartingAt(LIMIT, cursor);

    setPostsOrderedByDate(
      postsOrderedByDate.concat(newPosts as IFirestorePostData[]),
    );
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <>
      <Head>
        <title>Home || Bloggo</title>
      </Head>
      <AppLayout basicLayout>
        <section className="relative overflow-hidden">
          {/* Glassmorphism background */}
          <div className="absolute inset-x-0 top-0 min-h-0 pl-10 py-32 flex flex-col overflow-hidden z-0">
            <span className="bg-[#ef233c] w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 lg:w-96 lg:h-9w-96" />
            <span className="bg-[#04868b] w-80 h-80 ml-10 -mt-10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 lg:w-96 lg:h-9w-96 nc-animation-delay-2000" />
          </div>
          <div className="container relative">
            <MostPopularPostsSlider posts={mostLikedPosts} />
          </div>
        </section>
      </AppLayout>
    </>
  );
};

export default Index;
