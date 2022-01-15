/* eslint-disable jsx-a11y/anchor-is-valid */
import classnames from 'classnames';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

interface LinkProps extends NextLinkProps {
  className?: string;
  colorClass?: string;
}

export const Link: React.FC<LinkProps> = ({
  className = 'font-medium',
  colorClass = 'text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000',
  children,
  ...rest
}) => {
  return (
    <NextLink {...rest}>
      <a className={classnames(colorClass, className)}>{children}</a>
    </NextLink>
  );
};
