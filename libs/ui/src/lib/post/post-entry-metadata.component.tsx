import React from 'react';
import Moment from 'react-moment';

import { Avatar } from '../avatar.component';
import { Link } from '../link.component';

type PostEntryMetadataProps = {
  className?: string;
  meta: {
    author: {
      username: string;
    };
    date:
      | number
      | {
          seconds: number;
          nanoseconds: number;
        };
    readingTime: string;
  };
  size?: 'large' | 'normal';
  avatarRounded?: string;
};

export const PostEntryMetadata: React.FC<PostEntryMetadataProps> = ({
  className = 'leading-none',
  meta: { date, author, readingTime },
  size = 'normal',
  avatarRounded,
}) => {
  return (
    <div
      className={`nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 ${
        size === 'normal' ? 'text-xs' : 'text-sm'
      } ${className}`}
      data-nc-id="PostMeta2"
    >
      <Link
        href={'/author.username'}
        className="flex items-center space-x-2"
        colorClass=""
      >
        <Avatar
          radius={avatarRounded}
          sizeClass={
            size === 'normal'
              ? 'h-6 w-6 text-sm'
              : 'h-10 w-10 sm:h-11 sm:w-11 text-xl'
          }
          src={`https://ui-avatars.com/api/?name=${author.username}`}
          userName={author.username}
        />
      </Link>
      <div className="ml-3">
        <div className="flex items-center">
          <Link
            {...{ href: `/${author.username}` }}
            className="block font-semibold"
            colorClass=""
          >
            {author.username}
          </Link>
        </div>
        <div className="text-xs mt-[6px]">
          <span className="text-neutral-700 dark:text-neutral-300">
            <Moment format="ll">
              {typeof date === 'object' ? date.seconds : date}
            </Moment>
          </span>
          <span className="mx-2 font-semibold">·</span>
          <span className="text-neutral-700 dark:text-neutral-300">
            {readingTime} min read
          </span>
        </div>
      </div>
    </div>
  );
};
