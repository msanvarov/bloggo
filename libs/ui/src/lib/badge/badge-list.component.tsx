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
].map((category) => ({ ...category, taxonomy: 'category' }));

type BadgeListProps = {
  badgeClassName?: string;
};

export const BadgeList: React.FC<BadgeListProps> = ({ badgeClassName }) => {
  return (
    <>
      {categories.map((category, index) => (
        <Badge
          key={index}
          name={category.name}
          href={category.href}
          className={badgeClassName}
          color={category.color as BadgeColor}
        />
      ))}
    </>
  );
};
