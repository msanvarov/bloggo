/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

interface LinkProps extends NextLinkProps {
  className?: string;
  colorClass?: string;
  activeClassName?: string;
  children?: ReactNode;
}

export const Link = ({
  className = 'font-medium',
  colorClass = 'text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000',
  activeClassName = '',
  children,
  ...rest
}: LinkProps) => {
  const router = useRouter();

  return (
    <NextLink
      {...rest}
      className={classNames(colorClass, className, {
        [activeClassName]: router.asPath === rest.href,
      })}
    >
      {children}
    </NextLink>
  );
};
