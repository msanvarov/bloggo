import React from 'react';
import Moment from 'react-moment';

import { IFirestorePostData } from '@bloggo/redux';

import { Avatar } from '../avatar.component';
import { BadgeList } from '../badge';
import { ImageContainer } from '../image';
import { Link } from '../link.component';
import { PostPreviewCardActionButtons } from '../post/post-preview-card-action-buttons.component';

type SmallPostPreviewCardProps = {
  className?: string;
  post: IFirestorePostData;
};

export const SmallPostPreviewCard: React.FC<SmallPostPreviewCardProps> = ({
  className = 'h-full',
  post,
}) => {
  return (
    <div
      className={`relative flex group flex-col-reverse sm:flex-row sm:items-center p-4  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
    >
      <Link
        {...{ href: post.href }}
        className="absolute inset-0 z-0"
        colorClass=""
      ></Link>
      <div className="flex flex-col flex-grow">
        <div className="space-y-3 mb-4">
          <BadgeList />
          <h2 className={`block font-semibold text-base`}>
            <Link
              {...{ href: post.href }}
              className="line-clamp-2"
              colorClass=""
            >
              {post.title}
            </Link>
          </h2>
          <span className="block text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2">
            {post.description}
          </span>
          <div
            className={`nc-PostCardMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 'text-xs' leading-none`}
          >
            <Link
              {...{ href: `/${post.username}` }}
              className="relative flex items-center space-x-2"
              colorClass=""
            >
              <Avatar
                radius="rounded-full"
                sizeClass="h-7 w-7 text-sm"
                src={`https://ui-avatars.com/api/?name=${post.username}`}
                userName={post.username}
              />

              <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
                @{post.username}
              </span>
            </Link>

            <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
              ·
            </span>
            <span className="text-neutral-500 dark:text-neutral-400 font-normal">
              <Moment format="LL">{post.createdAt}</Moment>
            </span>
          </div>
        </div>
        <div className="flex items-center flex-wrap justify-between mt-auto">
          <PostPreviewCardActionButtons
            {...{
              commentCount: 21,
              likes: post.likeCount,
              href: post.href,
              isBookmarked: true,
              postId: `${post.uid}/${post.slug}`,
            }}
          />
        </div>
      </div>

      <Link
        {...{ href: post.href }}
        className={`block relative flex-shrink-0 w-full sm:w-40 h-40 sm:h-full sm:ml-5 rounded-2xl overflow-hidden mb-5 sm:mb-0 `}
        colorClass=""
      >
        <ImageContainer
          containerClassName="absolute inset-0"
          className="object-cover w-full h-full"
          src={post.thumbnail}
          alt={post.title}
        />
      </Link>
    </div>
  );
};
