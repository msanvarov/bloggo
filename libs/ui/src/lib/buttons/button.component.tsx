/* eslint-disable jsx-a11y/anchor-is-valid */
import classnames from 'classnames';
import Link from 'next/link';
import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  primary?: boolean;
  className?: string;
  translate?: string;
  sizeClass?: string;
  fontSize?: string;
  loading?: boolean;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  href?: string;
  targetBlank?: boolean;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  primary,
  className = 'text-neutral-700 dark:text-neutral-200',
  translate = '',
  sizeClass = 'px-4 py-3 sm:px-6',
  fontSize = 'text-sm sm:text-base font-medium',
  disabled = false,
  href,
  children,
  targetBlank,
  type,
  loading,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
}) => {
  const classes = classnames(
    'relative h-auto inline-flex items-center justify-center rounded-full transition-colors',
    fontSize,
    sizeClass,
    translate,
    {
      'disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50':
        primary,
    },
    className,
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0',
  );

  if (href) {
    const externalLinkRegex = /^http/;
    return externalLinkRegex.test(href) ? (
      <a
        {...{
          href,
          rel: 'noopener noreferrer',
          target: targetBlank ? '_blank' : undefined,
          onClick,
          className: classes,
        }}
      >
        {children || `External Link`}
      </a>
    ) : (
      <Link {...{ href, onClick }}>
        <a className={classes}>{children || `Link`}</a>
      </Link>
    );
  }
  return (
    <button
      {...{
        className: classes,
        disabled: disabled || loading,
        type,
        onClick,
      }}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children || 'Button'}
    </button>
  );
};
