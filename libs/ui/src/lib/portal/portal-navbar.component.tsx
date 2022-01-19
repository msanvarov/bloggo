import React from 'react';

import { Link } from '../link.component';

const pages = [
  {
    path: '/portal/create-post',
    emoji: '✍',
    pageName: 'Create Post',
  },
  {
    path: '/portal/posts',
    emoji: '📕',
    pageName: 'Posts',
  },
  {
    path: '/portal/liked-posts',
    emoji: '💖',
    pageName: 'Liked Posts',
  },
  {
    path: '/portal/edit-profile',
    emoji: '🛠',
    pageName: 'Edit Profile',
  },
];

export const PortalNavbar: React.FC = () => {
  return (
    <div className="flex-shrink-0 max-w-xl xl:w-80 xl:pr-8">
      <ul className="text-base space-y-1 text-neutral-6000 dark:text-neutral-400">
        {pages.map(({ path, pageName, emoji }, index) => {
          return (
            <li key={index}>
              <Link
                className="flex px-6 py-2.5 font-medium rounded-lg hover:text-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                href={path}
                activeClassName="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                colorClass=""
              >
                <span className="w-8 mr-1">{emoji}</span>
                {pageName}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
