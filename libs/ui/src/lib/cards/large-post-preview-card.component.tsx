import React from 'react';
import Moment from 'react-moment';

import { IFirestorePostData } from '@bloggo/redux';

import { Avatar } from '../avatar.component';
import { BadgeList } from '../badge';
import { SharePostButtonContainer } from '../buttons/share-post-button-container-component';
import { ImageContainer } from '../image';
import { Link } from '../link.component';
import { PostPreviewCardActionButtons } from '../post/post-preview-card-action-buttons.component';

type LargePostPreviewCardProps = {
  className?: string;
  post: IFirestorePostData;
  size?: 'normal' | 'large';
};

const LargePostPreviewCard: React.FC<LargePostPreviewCardProps> = ({
  className = 'h-full',
  size = 'normal',
  post,
}) => {
  return (
    <div
      className={`group relative flex flex-col  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] overflow-hidden ${className}`}
    >
      <span className="block flex-shrink-0 flex-grow relative w-full h-0 pt-[75%] sm:pt-[55%] rounded-xl sm:rounded-b-none overflow-hidden">
        <ImageContainer
          prevImageHorizontal
          containerClassName="absolute inset-0"
          src={post.thumbnail}
          alt={post.title}
        />
      </span>

      <SharePostButtonContainer className="absolute hidden md:grid gap-[5px] right-4 top-4 opacity-0 z-[-1] group-hover:z-10 group-hover:opacity-100 transition-all duration-300" />
      <Link
        {...{ href: post.href }}
        className="absolute inset-0"
        colorClass=""
      />

      <div className="p-4 sm:p-5 flex flex-col">
        <div className="space-y-3">
          <BadgeList />
          <h2
            className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors ${
              size === 'large' ? 'text-lg sm:text-2xl' : 'text-base'
            }`}
          >
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
        </div>
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
                <Moment format="LL">{post.createdAt}</Moment>
              </span>
            </span>
          </div>
        </Link>
        <div className="flex items-center justify-between mt-auto">
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
    </div>
  );
};

export default LargePostPreviewCard;
