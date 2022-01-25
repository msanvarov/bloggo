import classNames from 'classnames';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';

import {
  IFirestorePostData,
  IFirestoreUsernameData,
  fromMillis,
  getPostsByLikesWithLimit,
  getPostsWithLimit,
  getPostsWithLimitStartingAt,
  getUsernamesOrderedByDateWithLimit,
} from '@bloggo/redux';
import {
  AppLayout,
  LatestPostPreview,
  Metatags,
  MostPopularPostsSlider,
  NewestAuthorsSlider,
} from '@bloggo/ui';

interface IndexPageProps {
  latestPosts: IFirestorePostData[];
  mostLikedPosts: IFirestorePostData[];
  latestAuthors: IFirestoreUsernameData[];
}

// Max post to query per page
const LIMIT = 10;

export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const [latestPosts, mostLikedPosts, authors] = await Promise.all([
    getPostsWithLimit(LIMIT),
    getPostsByLikesWithLimit(3),
    getUsernamesOrderedByDateWithLimit(5),
  ]);

  return {
    props: {
      latestPosts: latestPosts as IFirestorePostData[],
      mostLikedPosts: mostLikedPosts as IFirestorePostData[],
      latestAuthors: authors as unknown as IFirestoreUsernameData[],
    },
  };
};

const Index: React.FC<IndexPageProps> = ({
  latestPosts,
  mostLikedPosts,
  latestAuthors,
}) => {
  const [postsOrderedByDate, setPostsOrderedByDate] =
    useState<IFirestorePostData[]>(latestPosts);
  const [loading, setLoading] = useState<boolean>(false);
  const [endOfPosts, setEndOfPosts] = useState<boolean>(false);

  console.log(latestAuthors);

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
      setEndOfPosts(true);
    }
  };

  return (
    <>
      <Metatags title="Home" />
      <AppLayout basicLayout>
        <section className="relative overflow-hidden">
          {/* Glassmorphism background */}
          <div className="absolute inset-x-0 top-0 min-h-0 pl-10 py-32 flex flex-col overflow-hidden z-0">
            <span className="bg-[#ef233c] w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 lg:w-96 lg:h-9w-96" />
            <span className="bg-[#04868b] w-80 h-80 ml-10 -mt-10 rounded-full mix-blend-multiply filter blur-3xl opacity-20 lg:w-96 lg:h-9w-96 nc-animation-delay-2000" />
          </div>

          <div className="container relative">
            <MostPopularPostsSlider
              posts={mostLikedPosts}
              className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-24"
            />
            <section className="relative py-16">
              {/* background */}
              <div
                className={classNames(
                  `absolute inset-y-0 w-screen xl:max-w-[1340px] 2xl:max-w-screen-2xl left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0`,
                  'bg-neutral-100 dark:bg-black dark:bg-opacity-20',
                )}
              />
              <NewestAuthorsSlider
                heading="Newest authors"
                subHeading="Say hello to future creator potentials"
                authors={latestAuthors}
              />
            </section>

            <LatestPostPreview
              className="py-16 lg:py-28"
              posts={postsOrderedByDate}
              onGetMorePostsClick={getMorePosts}
              {...{ loading, endOfPosts, categories: ['Every category'] }}
            />
          </div>
        </section>
      </AppLayout>
    </>
  );
};

export default Index;
