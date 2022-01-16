import classnames from 'classnames';
import React from 'react';
import { FiPenTool } from 'react-icons/fi';

type CreatePostProps = {
  className?: string;
  onClick: () => void;
};
export const CreatePost: React.FC<CreatePostProps> = ({
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={classnames(
        'text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center',
        className,
      )}
    >
      <span className="sr-only">Create post</span>
      <FiPenTool className="w-7 h-7" aria-hidden="true" />
    </button>
  );
};
