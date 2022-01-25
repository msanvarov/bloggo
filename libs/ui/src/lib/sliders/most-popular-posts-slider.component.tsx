import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import React, { Fragment, useState } from 'react';
import Moment from 'react-moment';

import { IFirestorePostData } from '@bloggo/redux';

import { Avatar } from '../avatar.component';
import { BadgeList } from '../badge';
import NextPrevButtons from '../buttons/next-prev-buttons.component';
import { ImageContainer } from '../image';
import { Link } from '../link.component';
import { PostPreviewCardActionButtons } from '../post/post-preview-card-action-buttons.component';
import { SectionHeading } from '../section-heading.component';

type MostPopularPostsSliderProps = {
  className?: string;
  heading?: string;
  posts: IFirestorePostData[];
};
// TODO: split up code into reusable components
export const MostPopularPostsSlider: React.FC<MostPopularPostsSliderProps> = ({
  posts,
  heading = 'Most popular posts',
  className = '',
}) => {
  const [indexActive, setIndexActive] = useState<number>(0);
  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= posts.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };
  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return posts.length - 1;
      }
      return state - 1;
    });
  };
  return (
    <div className={classNames('relative', className)}>
      {heading && (
        <SectionHeading desc="Discover the most fascinating trending posts.">
          {heading}
        </SectionHeading>
      )}
      {posts.map((post, index) => (
        <Transition
          key={index}
          appear={true}
          as="div"
          className={`relative flex flex-col-reverse md:flex-row justify-end ${className}`}
          show={index === indexActive}
        >
          <div className="md:absolute z-10 md:left-0 md:top-1/2 md:transform md:-translate-y-1/2 w-full -mt-8 md:mt-0 px-3 sm:px-6 md:px-0 md:w-3/5 lg:w-1/2 xl:w-2/5">
            <Transition.Child
              as={Fragment}
              enter="transform nc-will-change-transform transition-all duration-500"
              enterFrom="translate-y-4 opacity-0"
              enterTo="translate-y-0 opacity-100"
            >
              <div className="p-4 sm:p-8 xl:py-14 md:px-10 bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg shadow-lg rounded-3xl space-y-3 sm:space-y-5 !border-opacity-0 --  nc-dark-box-bg">
                <BadgeList />

                <h2 className="nc-card-title text-xl sm:text-2xl font-semibold ">
                  <Link
                    {...{ href: post.href }}
                    className="line-clamp-2"
                    colorClass=""
                  >
                    {post.title}
                  </Link>
                </h2>

                <Link
                  href={post.href}
                  className={`relative inline-flex items-center relative`}
                  colorClass=""
                >
                  <Avatar
                    sizeClass="h-10 w-10 text-base"
                    containerClassName="flex-shrink-0 mr-3"
                    radius="rounded-full"
                    src={`https://ui-avatars.com/api/?name=${post.username}`}
                    userName={post.username}
                  />
                  <div>
                    <h2
                      className={`text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium`}
                    >
                      @{post.username}
                    </h2>
                    <span
                      className={`flex items-center mt-1 text-xs text-neutral-500 dark:text-neutral-400`}
                    >
                      <span>
                        <Moment format="LL">{post.updatedAt}</Moment>
                      </span>
                      <span
                        className={`hidden lg:inline mx-1 transition-opacity`}
                      >
                        ·
                      </span>
                      <span className={`hidden lg:inline transition-opacity`}>
                        6 min read
                      </span>
                    </span>
                  </div>
                </Link>

                <div className="flex items-center justify-between mt-auto">
                  <PostPreviewCardActionButtons
                    classBgIcon="h-8 w-8 bg-neutral-50 bg-opacity-20 hover:bg-opacity-50 dark:bg-neutral-800 dark:bg-opacity-30 dark:hover:bg-opacity-50"
                    {...{
                      commentCount: 21,
                      likes: post.likes,
                      href: post.href,
                      isBookmarked: false,
                      postId: `${post.uid}/${post.slug}`,
                    }}
                  />
                </div>
              </div>
            </Transition.Child>
            <Transition.Child
              as="div"
              className="p-4 sm:pt-8 sm:px-10"
              enter="transform nc-will-change-transform transition-all duration-500 delay-100"
              enterFrom="translate-y-4 opacity-0"
              enterTo="translate-y-0 opacity-100"
            >
              <NextPrevButtons
                btnClassName="w-11 h-11 text-xl"
                onClickNext={handleClickNext}
                onClickPrev={handleClickPrev}
              />
            </Transition.Child>
          </div>
          <Transition.Child
            as="div"
            className="w-full md:w-4/5 lg:w-2/3"
            enter="transform nc-will-change-transform transition-all duration-500 delay-200"
            enterFrom="translate-y-4 scale-105 opacity-0"
            enterTo="translate-y-0 scale-100 opacity-100"
          >
            <Link href={post.href}>
              <ImageContainer
                prevImageHorizontal
                containerClassName="aspect-w-16 aspect-h-12 sm:aspect-h-9 md:aspect-h-14 lg:aspect-h-10 2xl:aspect-h-9 relative"
                className="absolute inset-0 object-cover rounded-3xl"
                src={post.thumbnail}
                alt={post.title}
              />
            </Link>
          </Transition.Child>
        </Transition>
      ))}
    </div>
  );
};
