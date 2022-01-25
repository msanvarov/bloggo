/* eslint-disable jsx-a11y/anchor-is-valid */
import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import { entries, groupBy, map } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';

import { AppState, useAppSelector } from '@bloggo/redux';

import { Button } from '../buttons';
import { DarkModeToggleContainer } from '../dark-mode-toggle';
import { Logo } from '../logo.component';
import { SocialMediaLinks } from '../social-media-links.component';
import { INavEntry } from './navigation-entry.component';
import { navigationOptions } from './navigation.component';

type MobileNavbarProps = {
  onClose?: () => void;
};
export const MobileNavbar: React.FC<MobileNavbarProps> = ({ onClose }) => {
  const router = useRouter();
  const { user } = useAppSelector((state: AppState) => state.user);

  const renderChildMenu = (navEntry: INavEntry) => {
    return (
      <ul className="nav-mobile-sub-menu pl-6 pb-1 text-base">
        {navEntry.children?.map((i, index) => (
          <Disclosure key={i.href + index} as="li">
            <Link
              href={{
                pathname: i.href || undefined,
              }}
            >
              <a
                className={classNames(
                  'flex px-4 py-2.5 text-neutral-900 dark:text-neutral-200 text-sm font-medium rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-[2px]',
                  { 'text-secondary': router.pathname === i.href },
                )}
              >
                <span onClick={onClose}>{i.name}</span>
                {i.children && (
                  <span
                    className="block flex-grow"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Disclosure.Button
                      as="span"
                      className="flex justify-end flex-grow"
                    >
                      <FiChevronDown
                        className="ml-2 h-4 w-4 text-neutral-500"
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                  </span>
                )}
              </a>
            </Link>
            {i.children && (
              <Disclosure.Panel>{renderChildMenu(i)}</Disclosure.Panel>
            )}
          </Disclosure>
        ))}
      </ul>
    );
  };
  return (
    <div className="overflow-y-auto w-full max-w-sm h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
      <div className="py-6 px-5">
        <Logo />
        <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
          <span>
            Discover the most outstanding articles on all topics of life. Write
            your stories and share them
          </span>

          <div className="flex justify-between items-center mt-4">
            <SocialMediaLinks itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300" />
            <span className="block">
              <DarkModeToggleContainer className="bg-neutral-100 dark:bg-neutral-800" />
            </span>
          </div>
        </div>
        <span className="absolute right-2 top-2 p-1">
          <button
            className={classNames(
              'w-8 h-8 flex items-center justify-center rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700',
              'focus:outline-none',
            )}
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <FiX className="w-5 h-5" />
          </button>
        </span>
      </div>
      <ul className="flex flex-col py-6 px-2 space-y-1">
        {map(
          entries(groupBy(navigationOptions, 'restriction')),
          ([restriction, navigationEntries], i) => {
            if (restriction === 'private' && !user) {
              return null;
            }
            return (
              <Fragment key={i}>
                {navigationEntries.map((navigationEntry) => (
                  <Disclosure
                    key={navigationEntry.id}
                    as="li"
                    className="text-neutral-900 dark:text-white"
                  >
                    <Link
                      href={{
                        pathname: navigationEntry.href || undefined,
                      }}
                    >
                      <a
                        className={classNames(
                          'flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg',
                          {
                            'text-secondary':
                              navigationEntry.href === router.asPath,
                          },
                        )}
                      >
                        <span onClick={onClose}>{navigationEntry.name}</span>
                        {navigationEntry.children && (
                          <span
                            className="block flex-grow"
                            onClick={(e) => e.preventDefault()}
                          >
                            <Disclosure.Button
                              as="span"
                              className="flex justify-end flex-grow"
                            >
                              <FiChevronDown
                                className="ml-2 h-4 w-4 text-neutral-500"
                                aria-hidden="true"
                              />
                            </Disclosure.Button>
                          </span>
                        )}
                      </a>
                    </Link>
                    {navigationEntry.children && (
                      <Disclosure.Panel>
                        {renderChildMenu(navigationEntry)}
                      </Disclosure.Panel>
                    )}
                  </Disclosure>
                ))}
              </Fragment>
            );
          },
        )}
      </ul>
      <div className="flex items-center justify-between py-6 px-5 space-x-4">
        <a href="/#" target="_blank" rel="noopener noreferrer">
          <Button primary>Login</Button>
        </a>
      </div>
    </div>
  );
};
