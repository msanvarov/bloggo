/* eslint-disable jsx-a11y/anchor-is-valid */
import { nanoid } from '@reduxjs/toolkit';
import { entries, groupBy, map } from 'lodash';
import React, { Fragment } from 'react';

import { AppState, useAppSelector } from '@bloggo/redux';

import { INavEntry, NavigationEntry } from './navigation-entry.component';

const generateUUID = () => `nc_${nanoid()}`;

const dashboardNavigationMenus: INavEntry[] = [
  {
    id: generateUUID(),
    href: '/dashboard/metrics',
    name: 'Metrics',
  },
  {
    id: generateUUID(),
    href: '/dashboard/profile',
    name: 'Profile',
  },
  {
    id: generateUUID(),
    href: '/dashboard/posts',
    name: 'Posts',
  },
];

export const navigationOptions: INavEntry[] = [
  //   hidden menu options until authentication is completed
  {
    id: generateUUID(),
    href: '/dashboard',
    name: 'Dashboard',
    type: 'dropdown',
    children: dashboardNavigationMenus,
    restriction: 'private',
  },
  {
    id: generateUUID(),
    href: '/contact',
    name: 'Contact',
    restriction: 'public',
  },
];

export const Navigation: React.FC = () => {
  const { user } = useAppSelector((state: AppState) => state.user);
  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
      {map(
        entries(groupBy(navigationOptions, 'restriction')),
        ([restriction, navigationEntries], i) => {
          if (restriction === 'private' && !user) {
            return null;
          }
          return (
            <Fragment key={i}>
              {navigationEntries.map((navigationEntry) => (
                <NavigationEntry
                  key={navigationEntry.id}
                  navigationEntry={navigationEntry}
                />
              ))}
            </Fragment>
          );
        },
      )}
    </ul>
  );
};
