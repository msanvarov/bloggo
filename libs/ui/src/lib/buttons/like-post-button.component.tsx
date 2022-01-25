import classNames from 'classnames';
import { doc, increment, writeBatch } from 'firebase/firestore';
import React, { useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';

import { AppState, db, useAppSelector } from '@bloggo/redux';

type LikePostButtonProps = {
  className?: string;
  likes: number;
  uid: string;
  postId: string;
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
  likes,
  uid,
  postId,
}) => {
  const { user } = useAppSelector((state: AppState) => state.user);
  const likeRef = doc(db, `${postId}/likes/${uid}`);
  const [likeDoc] = useDocument(likeRef);
  const [isLikePostButtonClicked, setIsLikePostButtonClicked] =
    useState<boolean>(likeDoc?.exists() ?? false);

  // Create a user-to-post relationship
  const addLike = async () => {
    const uid = user?.uid;
    if (uid) {
      const batch = writeBatch(db);

      batch.update(doc(db, postId), { likes: increment(1) });
      batch.set(likeRef, { uid });

      await batch.commit();
    }
  };

  // Remove a user-to-post relationship
  const removeLike = async () => {
    const batch = writeBatch(db);

    batch.update(doc(db, postId), { likes: increment(-1) });
    batch.delete(likeRef);

    await batch.commit();
  };

  const isLiked = () => {
    return isLikePostButtonClicked;
  };
  const getLikeCount = () => {
    if (isLikePostButtonClicked) {
      return likes + 1;
    }
    return likes;
  };
  const handleOnLikeButtonClick = () => {
    if (isLiked()) {
      removeLike();
      setIsLikePostButtonClicked(false);
    } else {
      addLike();
      setIsLikePostButtonClicked(true);
    }
  };
  return (
    <button
      className={classNames(
        'like-post-button',
        'relative min-w-[68px] flex items-center rounded-full leading-none group transition-colors',
        className,
        'focus:outline-none',
        isLiked()
          ? 'text-rose-600 bg-rose-50 dark:bg-rose-100'
          : 'text-neutral-700 bg-neutral-50 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 dark:hover:bg-rose-100 hover:text-rose-600 dark:hover:text-rose-500',
      )}
      onClick={() => handleOnLikeButtonClick()}
      title="Liked"
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
