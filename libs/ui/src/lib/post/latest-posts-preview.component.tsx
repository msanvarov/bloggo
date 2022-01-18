import React, { useState } from 'react';

import { IFirestorePostData } from '@bloggo/redux';

import { Button } from '../buttons';
import LargePostPreviewCard from '../cards/large-post-preview-card.component';
import { SmallPostPreviewCard } from '../cards/small-post-preview-card.component';
import { SectionHeading } from '../section-heading.component';

type LatestPostPreviewProps = {
  className?: string;
  heading?: string;
  // TODO: create data model for categories
  categories: string[];
  posts: IFirestorePostData[];
  onGetMorePostsClick?: () => void;
  loading: boolean;
  endOfPosts: boolean;
};

export const LatestPostPreview: React.FC<LatestPostPreviewProps> = ({
  className = '',
  heading = 'Latest Articles 🎈',
  categories,
  posts,
  onGetMorePostsClick,
  loading,
  endOfPosts,
}) => {
  // TODO: implement proper category filtering
  // let timeOut: NodeJS.Timeout | null = null;
  const [categorySelected, setCategorySelected] = useState<string>(
    categories[0],
  );
  const handleClickTab = (category: string) => {
    if (category === categorySelected) {
      return;
    }
    // setIsLoading(true);
    setCategorySelected(category);
    // if (timeOut) {
    //   clearTimeout(timeOut);
    // }
    // timeOut = setTimeout(() => {
    //   setIsLoading(false);
    // }, 600);
  };
  if (loading) {
    console.log('Loader');
  }
  return (
    <section className={className}>
      <div className="flex flex-col mb-8 relative">
        <SectionHeading>{heading}</SectionHeading>
        <div className="flex items-center justify-between">
          <nav className="relative flex w-full overflow-x-auto text-sm md:text-base">
            <ul className="flex sm:space-x-2">
              {categories.map((category, index) => (
                <li className="relative" key={index}>
                  <button
                    className={`block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full ${
                      categorySelected === category
                        ? 'bg-primary-6000 text-secondary-50 '
                        : 'text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    } focus:outline-none`}
                    onClick={() => handleClickTab(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <span className="hidden sm:block flex-shrink-0">
            <nav
              className={`nc-Pagination inline-flex space-x-1 text-base font-medium`}
            >
              <span
                className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white focus:outline-none`}
              >
                {1}
              </span>
              <span
                className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 focus:outline-none`}
              >
                {2}
              </span>
            </nav>
          </span>
        </div>
      </div>
      {posts.length < 1 && <span>No posts to be displayed</span>}
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
        {posts[0] && <LargePostPreviewCard size="large" post={posts[0]} />}
        <div className="grid gap-6 md:gap-8">
          {posts
            .filter((_, i) => i < 4 && i > 0)
            .map((item, index) => (
              <SmallPostPreviewCard key={index} post={item} />
            ))}
        </div>
      </div>
    </section>
  );
};
