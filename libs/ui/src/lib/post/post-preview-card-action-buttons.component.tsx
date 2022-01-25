import React from 'react';

import { AppState, useAppSelector } from '@bloggo/redux';

import { BookmarkPostButton, LikePostButton } from '../buttons';
import { CommentOnPostButton } from '../buttons/comment-on-post-button.component';

type PostPreviewCardActionButtonsProps = {
  className?: string;
  itemClass?: string;
  likes: number;
  postId: string;
  href: string;
  isBookmarked: boolean;
  commentCount: number;
  hiddenCommentOnMobile?: boolean;
  onClickLike?: (id: string) => void;
  classBgIcon?: string;
};
export const PostPreviewCardActionButtons: React.FC<
  PostPreviewCardActionButtonsProps
> = ({
  className = '',
  itemClass = 'px-3 h-8 text-xs',
  hiddenCommentOnMobile = true,
  isBookmarked,
  likes,
  postId,
  href,
  commentCount,
  classBgIcon,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClickLike = () => {},
}) => {
  const { user } = useAppSelector((state: AppState) => state.user);
  return (
    <>
      <div className={`flex items-center space-x-2 ${className}`}>
        {user?.uid && (
          <LikePostButton
            className={itemClass}
            {...{ likes, postId, uid: user.uid }}
          />
        )}

        <CommentOnPostButton
          href={href}
          commentCount={commentCount}
          className={`${
            hiddenCommentOnMobile ? 'hidden sm:flex' : 'flex'
          }  ${itemClass}`}
        />
      </div>
      <div
        className={`flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 ${className}`}
      >
        <span>6 min read</span>
        {/* TODO: fix postId to have the slug  */}
        <BookmarkPostButton
          postId={postId}
          initBookmarked={isBookmarked}
          containerClassName={classBgIcon}
        />
      </div>
    </>
  );
};
