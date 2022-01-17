import classnames from 'classnames';
import React from 'react';

import { Link } from './link.component';

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
  const classes = classnames(
    'nc-Badge relative inline-flex px-2.5 py-1 rounded-full font-medium text-xs',
    className,
  );

  const getColorClass = (hasHover = true) => {
    switch (color) {
      case 'pink':
        return `text-pink-800 bg-pink-100 ${
          hasHover ? 'hover:bg-pink-800' : ''
        }`;
      case 'red':
        return `text-red-800 bg-red-100 ${hasHover ? 'hover:bg-red-800' : ''}`;
      case 'gray':
        return `text-gray-800 bg-gray-100 ${
          hasHover ? 'hover:bg-gray-800' : ''
        }`;
      case 'green':
        return `text-green-800 bg-green-100 ${
          hasHover ? 'hover:bg-green-800' : ''
        }`;
      case 'purple':
        return `text-purple-800 bg-purple-100 ${
          hasHover ? 'hover:bg-purple-800' : ''
        }`;
      case 'indigo':
        return `text-indigo-800 bg-indigo-100 ${
          hasHover ? 'hover:bg-indigo-800' : ''
        }`;
      case 'yellow':
        return `text-yellow-800 bg-yellow-100 ${
          hasHover ? 'hover:bg-yellow-800' : ''
        }`;
      case 'blue':
        return `text-blue-800 bg-blue-100 ${
          hasHover ? 'hover:bg-blue-800' : ''
        }`;
      default:
        return `text-pink-800 bg-pink-100 ${
          hasHover ? 'hover:bg-pink-800' : ''
        }`;
    }
  };

  return href ? (
    <Link
      {...{ href }}
      className={classnames(
        `transition-colors hover:text-white duration-300`,
        classes,
        getColorClass(),
      )}
    >
      {name}
    </Link>
  ) : (
    <span className={classnames(classes, getColorClass(false))}>{name}</span>
  );
};
