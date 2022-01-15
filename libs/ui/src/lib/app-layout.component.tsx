import classnames from 'classnames';
import React from 'react';

import { PageHeading } from './page-heading.component';

type AppLayoutProps = {
  className?: string;
  heading: string;
  headingEmoji?: string;
  subHeading?: string;
};

export const AppLayout: React.FC<AppLayoutProps> = ({
  className = '',
  heading,
  subHeading,
  headingEmoji,
  children,
}) => {
  return (
    <section className={classnames('relative', className)}>
      {/* background */}
      <div
        className={classnames(
          'absolute h-[225px] top-0 left-0 right-0 w-full bg-primary-100 dark:bg-neutral-800 bg-opacity-25 dark:bg-opacity-40',
        )}
      />
      <div className="container relative pt-10 pb-16 lg:pt-20 lg:pb-28">
        {/* heading  */}
        <div className="text-center max-w-2xl mx-auto">
          <PageHeading {...{ emoji: headingEmoji }}>{heading}</PageHeading>
          {subHeading && (
            <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
              {subHeading}
            </span>
          )}
        </div>
        {/* content */}
        <div className="p-5 mx-auto bg-white rounded-[40px] shadow-lg sm:p-10 mt-10 lg:mt-20 lg:p-16 dark:bg-neutral-900">
          {children}
        </div>
      </div>
    </section>
  );
};
