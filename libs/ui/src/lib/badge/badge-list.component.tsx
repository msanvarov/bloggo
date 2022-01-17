import React from 'react';

import { Badge, BadgeColor } from './badge.component';

// TODO: cleanup the mock data
const categories = [
  {
    id: 15,
    name: 'Computers',
    href: '/archive/the-demo-archive-slug',
    thumbnail:
      'https://images.unsplash.com/photo-1532529867795-3c83442c1e5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    count: 26,
    color: 'blue',
  },
  {
    id: 16,
    name: 'Design',
    href: '/archive/the-demo-archive-slug',
    thumbnail:
      'https://images.unsplash.com/photo-1536329583941-14287ec6fc4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGRlc2lnbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    count: 15,
    color: 'indigo',
  },
].map((category) => ({ ...category, taxonomy: 'category' }));

export const BadgeList: React.FC = () => {
  return (
    <>
      {categories.map((category, index) => (
        <Badge
          key={index}
          name={category.name}
          href={category.href}
          color={category.color as BadgeColor}
        />
      ))}
    </>
  );
};
