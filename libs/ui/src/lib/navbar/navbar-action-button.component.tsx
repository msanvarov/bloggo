import classnames from 'classnames';
import React from 'react';

import { Link } from '../link.component';

type NavbarActionButtonProps = {
  className?: string;
  href: string;
  icon: React.ReactNode;
};
export const NavbarActionButton: React.FC<NavbarActionButtonProps> = ({
  className,
  href,
  icon,
}) => {
  return (
    <Link
      {...{ href }}
      className={classnames(
        'text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center',
        className,
      )}
      colorClass=""
    >
      <span className="sr-only">Create post</span>
      {icon}
    </Link>
  );
};
