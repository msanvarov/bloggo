import classNames from 'classnames';
import { ReactNode } from 'react';

type LabelProps = {
  className?: string;
  children?: ReactNode;
};

export const Label = ({ className = '', children }: LabelProps) => {
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
