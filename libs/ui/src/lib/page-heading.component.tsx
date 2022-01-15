import React, { HTMLAttributes } from 'react';

interface PageHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  emoji?: string;
  className?: string;
}

export const PageHeading: React.FC<PageHeadingProps> = ({
  className = 'justify-center',
  emoji = '',
  children,
  ...rest
}) => {
  return (
    <h2
      className={`flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 ${className}`}
      {...rest}
    >
      {emoji && (
        <span className="mr-4 text-3xl md:text-4xl leading-none">{emoji}</span>
      )}
      {children || `Heading`}
    </h2>
  );
};
