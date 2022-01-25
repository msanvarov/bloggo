import classNames from 'classnames';
import React from 'react';

type LabelProps = {
  className?: string;
};

export const Label: React.FC<LabelProps> = ({ className = '', children }) => {
  return (
    <span
      className={classNames(
        className,
        `text-neutral-800 font-medium text-sm dark:text-neutral-300`,
      )}
    >
      {children}
    </span>
  );
};
