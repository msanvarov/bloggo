/* eslint-disable jsx-a11y/anchor-is-valid */
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';

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
  },
  {
    id: generateUUID(),
    href: '/contact',
    name: 'Contact',
  },
];

export const Navigation: React.FC = () => {
  return (
    <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:items-center lg:space-x-1 relative">
      {navigationOptions.map((navigationEntry, i) => (
        <NavigationEntry key={i} {...{ navigationEntry }} />
      ))}
    </ul>
  );
};
