/* eslint-disable jsx-a11y/anchor-is-valid */
import classnames from 'classnames';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface LinkProps extends NextLinkProps {
  className?: string;
  colorClass?: string;
  activeClassName?: string;
}

export const Link: React.FC<LinkProps> = ({
  className = 'font-medium',
  colorClass = 'text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000',
  activeClassName = '',
  children,
  ...rest
}) => {
  const router = useRouter();

  return (
    <NextLink {...rest}>
      <a
        className={classnames(colorClass, className, {
          [activeClassName]: router.asPath === rest.href,
        })}
      >
        {children}
      </a>
    </NextLink>
  );
};
