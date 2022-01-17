import React from 'react';

import { Logo } from './logo.component';
import { SocialMediaLinks } from './social-media-links.component';

const footerNavigationOptions = [
  {
    id: '1',
    title: 'Explore',
    menus: [
      { href: '/login', label: 'Login' },
      { href: '/register', label: 'Register' },
      { href: '/forgot-password', label: 'Forgot Password' },
    ],
  },
];

export const Footer: React.FC = () => {
  return (
    <div className="relative py-16 lg:py-28 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            <Logo />
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialMediaLinks className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" />
          </div>
        </div>
        {footerNavigationOptions.map((menu, index) => (
          <div key={index} className="text-sm">
            <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
              {menu.title}
            </h2>
            <ul className="mt-5 space-y-4">
              {menu.menus.map((item, index) => (
                <li key={index}>
                  <a
                    key={index}
                    className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
