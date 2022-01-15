import classnames from 'classnames';
import React, { useState } from 'react';

type LikePostButtonProps = {
  className?: string;
  postId: string;
  onClickLike?: (id: string) => void;
  like: {
    count: number;
    isLiked: boolean;
  };
};

const formatLikeNumber = (number: number): string => {
  let formattedNumber = '';
  if (number < 1000) {
    formattedNumber = number.toString();
  } else if (number < 1000000) {
    formattedNumber = (number / 1000).toFixed(1) + 'K';
  }
  return formattedNumber;
};

export const LikePostButton: React.FC<LikePostButtonProps> = ({
  className = 'px-3 h-8 text-xs',
  postId,
  like,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClickLike = () => {},
}) => {
  // TODO: redux to track likes
  const [isLikePostButtonClicked, setIsLikePostButtonClicked] =
    useState<boolean>(false);

  const isLiked = () => {
    return isLikePostButtonClicked || like.isLiked;
  };
  const getLikeCount = () => {
    if (isLikePostButtonClicked || like.isLiked) {
      return like.count + 1;
    }
    return like.count;
  };
  const handleOnLikeButtonClick = () => {
    if (isLiked()) {
      setIsLikePostButtonClicked(false);
    } else {
      setIsLikePostButtonClicked(true);
    }
    onClickLike(postId);
  };
  return (
    <button
      className={classnames(
        'nc-PostCardLikeAction relative min-w-[68px] flex items-center rounded-full leading-none group transition-colors',
        className,
        'focus:outline-none',
        {
          'text-rose-600 bg-rose-50 dark:bg-rose-100': isLiked,
          'text-neutral-700 bg-neutral-50 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 dark:hover:bg-rose-100 hover:text-rose-600 dark:hover:text-rose-500':
            !isLiked(),
        },
      )}
      onClick={() => handleOnLikeButtonClick()}
      title="Liked"
      data-nc-id="PostCardLikeAction"
    >
      <svg
        width="24"
        height="24"
        fill={isLiked() ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
          clipRule="evenodd"
        ></path>
      </svg>

      <span
        className={`ml-1 ${
          isLiked() ? 'text-rose-600' : 'text-neutral-900 dark:text-neutral-200'
        }`}
      >
        {formatLikeNumber(getLikeCount())}
      </span>
    </button>
  );
};
