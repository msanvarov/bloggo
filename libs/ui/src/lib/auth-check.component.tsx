/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode } from 'react';

import { AppState, useAppSelector } from '@bloggo/redux';

import { Link } from './link.component';

type AppCheckProps = {
  // managed by Next
  fallback?: ReactNode;
  children: ReactNode;
};

export const AuthCheck = ({ children, fallback }: AppCheckProps) => {
  const { user } = useAppSelector((state: AppState) => state.user);
  return user ? (
    <>{children}</>
  ) : (
    <>{fallback}</> || (
      <Link href="/login">Must be authenticated to access resource.</Link>
    )
  );
};
