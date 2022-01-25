import classNames from 'classnames';
import React from 'react';

import { Link } from '../link.component';

export type BadgeColor =
  | 'pink'
  | 'green'
  | 'yellow'
  | 'red'
  | 'indigo'
  | 'blue'
  | 'purple'
  | 'gray';

type BadgeProps = {
  className?: string;
  name: React.ReactNode;
  color?: BadgeColor;
  href?: string;
};

export const Badge: React.FC<BadgeProps> = ({
  className = '',
  name,
  color = 'blue',
  href,
}) => {
  const classes = classNames(
    'relative inline-flex px-2.5 py-1 rounded-full font-medium text-xs',
    className,
  );

  const getColorClass = (hasHover = true) => {
    switch (color) {
      case 'pink':
        return `text-pink-800 bg-pink-100 ${
          hasHover ? 'hover:bg-pink-200' : ''
        }`;
      case 'red':
        return `text-red-800 bg-red-100 ${hasHover ? 'hover:bg-red-200' : ''}`;
      case 'gray':
        return `text-gray-800 bg-gray-100 ${
          hasHover ? 'hover:bg-gray-200' : ''
        }`;
      case 'green':
        return `text-green-800 bg-green-100 ${
          hasHover ? 'hover:bg-green-200' : ''
        }`;
      case 'purple':
        return `text-white-800 bg-purple-100 ${
          hasHover ? 'hover:bg-purple-200' : ''
        }`;
      case 'indigo':
        return `text-indigo-800 bg-indigo-100 ${
          hasHover ? 'hover:bg-indigo-200' : ''
        }`;
      case 'yellow':
        return `text-yellow-800 bg-yellow-100 ${
          hasHover ? 'hover:bg-yellow-200' : ''
        }`;
      case 'blue':
        return `text-blue-800 bg-blue-100 ${
          hasHover ? 'hover:bg-blue-200' : ''
        }`;
      default:
        return `text-pink-800 bg-pink-100 ${
          hasHover ? 'hover:bg-pink-200' : ''
        }`;
    }
  };

  return href ? (
    <Link
      {...{ href }}
      className={classNames(
        `transition-colors hover:text-white duration-300`,
        classes,
        getColorClass(),
      )}
    >
      {name}
    </Link>
  ) : (
    <span className={classNames(classes, getColorClass(false))}>{name}</span>
  );
};
