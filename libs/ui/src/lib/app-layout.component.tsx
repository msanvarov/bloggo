import classnames from 'classnames';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, db, setUser, setUsername, useAppDispatch } from '@bloggo/redux';

import { PageHeading } from './page-heading.component';

type AppLayoutProps = {
  className?: string;
  heading: string;
  headingEmoji?: string;
  subHeading?: string;
  // basic layout
  basicLayout?: boolean;
};

export const AppLayout: React.FC<AppLayoutProps> = ({
  className = '',
  heading,
  subHeading,
  headingEmoji,
  children,
  basicLayout = false,
}) => {
  const dispath = useAppDispatch();
  const [user] = useAuthState(auth);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      dispath(
        setUser({
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: user.metadata.creationTime,
          lastLoginAt: user.metadata.lastSignInTime,
        }),
      );
      unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
        dispath(setUsername(doc.data()?.['username']));
      });
    } else {
      dispath(setUsername(null));
      dispath(setUser(null));
    }

    return unsubscribe;
  }, [user]);

  return basicLayout ? (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  ) : (
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
