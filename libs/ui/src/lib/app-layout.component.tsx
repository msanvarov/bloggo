import classNames from 'classnames';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { ReactNode, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { setUser, setUsername, useAppDispatch } from '@bloggo/redux';

import { PageHeading } from './page-heading.component';

const db = getFirestore();
const auth = getAuth();

type AppLayoutProps = {
  className?: string;
  heading?: string;
  headingEmoji?: string;
  subHeading?: string;
  // basic layout
  basicLayout?: boolean;
  children: ReactNode;
};

export const AppLayout = ({
  className = '',
  heading,
  subHeading,
  headingEmoji,
  children,
  basicLayout = false,
}: AppLayoutProps) => {
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
        const data = doc.data();
        if (data) {
          dispath(setUsername(data['username']));
        }
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
    <section className={classNames('relative', className)}>
      {/* background */}
      <div
        className={classNames(
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
