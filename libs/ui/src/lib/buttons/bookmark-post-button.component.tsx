import classnames from 'classnames';
import React, { useState } from 'react';

type BookmarkPostButtonProps = {
  containerClassName?: string;
  iconClass?: string;
  initBookmarked: boolean;
  postId: string;
};
// TODO: redux state
export const BookmarkPostButton: React.FC<BookmarkPostButtonProps> = ({
  containerClassName = 'h-8 w-8 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-700',
  postId,
  initBookmarked,
}) => {
  const [isBookmarkPostButtonClicked, setIsBookmarkPostButtonClicked] =
    useState<boolean>(false);
  const isBookmarked = () => {
    return isBookmarkPostButtonClicked || initBookmarked;
  };
  const handleOnBookmarkButtonClick = () => {
    if (isBookmarked()) {
      setIsBookmarkPostButtonClicked(false);
    } else {
      setIsBookmarkPostButtonClicked(true);
    }
  };
  console.log(postId);
  return (
    <button
      className={classnames(
        'like-post-button',
        'relative rounded-full flex items-center justify-center',
        'focus:outline-none',
        containerClassName,
      )}
      onClick={handleOnBookmarkButtonClick}
      title="Save to reading list"
    >
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          aria-hidden="true"
          fill={isBookmarked() ? 'currentColor' : 'none'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
        ></path>
      </svg>
    </button>
  );
};
