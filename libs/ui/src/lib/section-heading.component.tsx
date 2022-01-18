/* eslint-disable @typescript-eslint/no-empty-function */
import React, { HTMLAttributes, ReactNode } from 'react';

import NextPrevButtons from './buttons/next-prev-buttons.component';

export interface SectionHeadingProps
  extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  desc?: ReactNode;
  hasNextPrev?: boolean;
  isCenter?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  desc = 'Placeholder description.',
  className = 'mb-12 md:mb-16 text-neutral-900 dark:text-neutral-50',
  isCenter = false,
  hasNextPrev = false,
  ...rest
}) => {
  return (
    <div
      className={`relative flex flex-col sm:flex-row sm:items-end justify-between ${className}`}
    >
      <div
        className={
          isCenter ? 'text-center w-full max-w-2xl mx-auto ' : 'max-w-2xl'
        }
      >
        <h2 className={`text-3xl md:text-4xl font-semibold`} {...rest}>
          {children || `Section Heading`}
        </h2>
        {desc && (
          <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
            {desc}
          </span>
        )}
      </div>
      {hasNextPrev && !isCenter && (
        <div className="mt-4 flex justify-end sm:ml-2 sm:mt-0 flex-shrink-0">
          <NextPrevButtons />
        </div>
      )}
    </div>
  );
};
