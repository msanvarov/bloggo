import classnames from 'classnames';
import React from 'react';

import { IFirestorePostsData, IFirestoreUserData } from '@bloggo/redux';

import { Badge, BadgeColor } from '../badge.component';
import { Link } from '../link.component';
import { PostPreviewCardActionButtons } from './post-preview-card-action-buttons.component';
import { PostPreviewCardAuthor } from './post-preview-card-author.component';
import { PostThumbnail } from './post-thumbnail.component';

interface PostPreviewCardProps {
  className?: string;
  author: IFirestoreUserData;
  post: IFirestorePostsData;
  ratio?: string;
  isAuthorHidden?: boolean;
}

// TODO: cleanup the mock data
const categories = [
  {
    id: 15,
    name: 'Computers',
    href: '/archive/the-demo-archive-slug',
    thumbnail:
      'https://images.unsplash.com/photo-1532529867795-3c83442c1e5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    count: 26,
    color: 'blue',
  },
  {
    id: 16,
    name: 'Design',
    href: '/archive/the-demo-archive-slug',
    thumbnail:
      'https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRlc2lnbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    count: 15,
    color: 'indigo',
  },
].map((category) => ({ ...category, taxonomy: 'category' }));

export const PostPreviewCard: React.FC<PostPreviewCardProps> = ({
  className = 'h-full',
  post,
  author,
  isAuthorHidden = false,
  ratio = 'aspect-w-4 aspect-h-3',
}) => {
  const { uid, title, thumbnail, href, createdAt, updatedAt, likeCount, slug } =
    post;

  return (
    <div
      className={classnames(
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
                src: thumbnail,
                type: 'image',
              },
            }}
          />
        </div>
      </div>
      <Link {...{ href }} className="absolute inset-0" colorClass="" />
      <span className="absolute top-3 inset-x-3">
        <div className="flex flex-wrap space-x-2">
          {/* badges */}
          {categories.map((category, index) => (
            <Badge
              key={index}
              name={category.name}
              href={category.href}
              color={category.color as BadgeColor}
            />
          ))}
        </div>
      </span>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        {!isAuthorHidden ? (
          <PostPreviewCardAuthor {...{ author, date: updatedAt }} />
        ) : (
          <span className="text-xs text-neutral-500">{createdAt}</span>
        )}
        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          <Link {...{ href }} className="line-clamp-2" colorClass="">
            {title}
          </Link>
        </h2>
        <div className="flex items-end justify-between mt-auto">
          <PostPreviewCardActionButtons
            className="relative"
            {...{
              commentCount: 21,
              likeCount,
              href,
              isBookmarked: false,
              postId: `${uid}/${slug}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
