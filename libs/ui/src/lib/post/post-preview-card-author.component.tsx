import React from 'react';
import Moment from 'react-moment';

import { IFirestoreUserData } from '@bloggo/redux';

import { Avatar } from '../avatar.component';
import { Link } from '../link.component';

type PostPreviewCardAuthorProps = {
  className?: string;
  author: IFirestoreUserData;
  date: number;
  hiddenAvatar?: boolean;
  size?: 'large' | 'normal';
};

export const PostPreviewCardAuthor: React.FC<PostPreviewCardAuthorProps> = ({
  className = 'leading-none',
  author,
  date,
  hiddenAvatar = false,
  size = 'normal',
}) => {
  return (
    <div
      className={`inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${
        size === 'normal' ? 'text-xs' : 'text-base'
      } ${className}`}
    >
      <Link
        href={`/${author}`}
        className="relative flex items-center space-x-2"
      >
        {!hiddenAvatar && (
          <Avatar
            radius="rounded-full"
            sizeClass={
              size === 'normal' ? 'h-7 w-7 text-sm' : 'h-10 w-10 text-xl'
            }
            src={author.photoURL}
            userName={author.displayName}
          />
        )}
        <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
          {author.displayName}
        </span>
      </Link>

      <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
        ·
      </span>
      <span className="text-neutral-500 dark:text-neutral-400 font-normal">
        <Moment format="LL">{date}</Moment>
      </span>
    </div>
  );
};
