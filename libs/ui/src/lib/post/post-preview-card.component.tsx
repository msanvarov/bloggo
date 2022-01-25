import classNames from 'classnames';
import React from 'react';

import { IFirestorePostData, IFirestoreUserData } from '@bloggo/redux';

import { BadgeList } from '../badge';
import { Link } from '../link.component';
import { PostPreviewCardActionButtons } from './post-preview-card-action-buttons.component';
import { PostPreviewCardAuthor } from './post-preview-card-author.component';
import { PostThumbnail } from './post-thumbnail.component';

interface PostPreviewCardProps {
  className?: string;
  author: IFirestoreUserData;
  post: IFirestorePostData;
  ratio?: string;
  isAuthorHidden?: boolean;
}

export const PostPreviewCard: React.FC<PostPreviewCardProps> = ({
  className = 'h-full',
  post,
  author,
  isAuthorHidden = false,
  ratio = 'aspect-w-4 aspect-h-3',
}) => {
  return (
    <div
      className={classNames(
        'relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]',
        className,
      )}
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}
      >
        <div>
          <PostThumbnail
            {...{
              media: {
                src: post.thumbnail,
                type: 'image',
              },
            }}
          />
        </div>
      </div>
      <Link
        {...{ href: post.href }}
        className="absolute inset-0"
        colorClass=""
      />
      <span className="absolute top-3 inset-x-3">
        <div className="flex flex-wrap space-x-2">
          {/* badges */}
          <BadgeList />
        </div>
      </span>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        {!isAuthorHidden ? (
          <PostPreviewCardAuthor {...{ author, date: post.updatedAt }} />
        ) : (
          <span className="text-xs text-neutral-500">{post.createdAt}</span>
        )}
        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          <Link {...{ href: post.href }} className="line-clamp-2" colorClass="">
            {post.title}
          </Link>
        </h2>
        <div className="flex items-end justify-between mt-auto">
          <PostPreviewCardActionButtons
            className="relative"
            {...{
              commentCount: 21,
              likes: post.likeCount,
              href: post.href,
              isBookmarked: false,
              postId: `${post.uid}/${post.slug}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
