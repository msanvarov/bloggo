/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';

import { AppState, useAppSelector } from '@bloggo/redux';

import { Link } from './link.component';

type AppCheckProps = {
  // managed by Next
  fallback?: React.ReactNode;
};

export const AuthCheck: React.FC<AppCheckProps> = ({ children, fallback }) => {
  const { user } = useAppSelector((state: AppState) => state.user);
  return user ? (
    <>{children}</>
  ) : (
    <>{fallback}</> || (
      <Link href="/login">Must be authenticated to access resource.</Link>
    )
  );
};
