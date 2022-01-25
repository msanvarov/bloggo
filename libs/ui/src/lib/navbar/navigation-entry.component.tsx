/* eslint-disable jsx-a11y/anchor-is-valid */
import { Popover, Transition } from '@headlessui/react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export interface INavEntry {
  id: string;
  name: string;
  href: string;
  targetBlank?: boolean;
  children?: INavEntry[];
  type?: 'dropdown';
  restriction?: 'public' | 'private';
}

export interface NavigationEntryProps {
  navigationEntry: INavEntry;
}

export const NavigationEntry: React.FC<NavigationEntryProps> = ({
  navigationEntry,
}) => {
  const router = useRouter();
  const [hoverableMenuEntries, setHoverableMenuEntries] = useState<string[]>(
    [],
  );
  // Listens to the router path changes, and clears the hoverable menu entries
  useEffect(() => {
    setHoverableMenuEntries([]);
  }, [router.asPath]);

  const onMouseEnterMenu = (id: string) => {
    setHoverableMenuEntries((state) => [...state, id]);
  };

  const onMouseLeaveMenu = (id: string) => {
    setHoverableMenuEntries((state) =>
      state.filter((item, index) => item !== id && index < state.indexOf(id)),
    );
  };

  const renderDropdownMenu = (entry: INavEntry) => {
    const isHover = hoverableMenuEntries.includes(entry.id);
    return (
      <Popover
        as="li"
        className="menu-item menu-dropdown relative"
        onMouseEnter={() => onMouseEnterMenu(entry.id)}
        onMouseLeave={() => onMouseLeaveMenu(entry.id)}
      >
        {() => (
          <>
            <Popover.Button>{renderMainMenu(entry)}</Popover.Button>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="sub-menu nc-will-change-transform absolute transform z-10 w-56 pt-3 left-0"
              >
                <ul className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1">
                  {entry.children?.map((i) => {
                    if (i.type) {
                      return renderDropdownMenuNavlinkChildren(i);
                    } else {
                      return (
                        <li key={i.id} className="px-2">
                          {renderDropdownMenuNavlink(i)}
                        </li>
                      );
                    }
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderDropdownMenuNavlinkChildren = (entry: INavEntry) => {
    const isHover = hoverableMenuEntries.includes(entry.id);
    return (
      <Popover
        as="li"
        key={entry.id}
        className="menu-item menu-dropdown relative px-2"
        onMouseEnter={() => onMouseEnterMenu(entry.id)}
        onMouseLeave={() => onMouseLeaveMenu(entry.id)}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {renderDropdownMenuNavlink(entry)}
            </Popover.Button>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="sub-menu absolute z-10 w-56 left-full pl-2 top-0"
              >
                <ul className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1">
                  {entry.children?.map((i) => {
                    if (i.type) {
                      return renderDropdownMenuNavlinkChildren(i);
                    } else {
                      return (
                        <li key={i.id} className="px-2">
                          {renderDropdownMenuNavlink(i)}
                        </li>
                      );
                    }
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderDropdownMenuNavlink = (entry: INavEntry) => {
    return (
      <Link
        href={{
          pathname: entry.href || undefined,
        }}
      >
        <a
          target={entry.targetBlank ? '_blank' : undefined}
          rel="noopener noreferrer"
          className={classNames(
            'flex items-center font-normal text-neutral-6000 dark:text-neutral-300 py-2 px-4 rounded-md hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200',
            {
              '!font-semibold !text-neutral-700 dark:!text-neutral-200':
                entry.href === router.asPath,
            },
          )}
        >
          {entry.name}
          {entry.type && (
            <FiChevronDown
              className="ml-2 h-4 w-4 text-neutral-500"
              aria-hidden="true"
            />
          )}
        </a>
      </Link>
    );
  };

  const renderMainMenu = (entry: INavEntry) => {
    return (
      <Link
        href={{
          pathname: entry.href || undefined,
        }}
      >
        <a
          className={classNames(
            'inline-flex items-center text-sm xl:text-base font-normal text-neutral-700 dark:text-neutral-300 py-2 px-4 xl:px-5 rounded-full hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200',
            {
              '!font-semibold !text-neutral-900 bg-neutral-100 dark:bg-neutral-800 dark:!text-neutral-100':
                entry.href === router.asPath ||
                entry.href.split('/')[1] ===
                  router.asPath.split('/').slice(-2)[0],
            },
          )}
          target={entry.targetBlank ? '_blank' : undefined}
          rel="noopener noreferrer"
        >
          {entry.name}
          {entry.type && (
            <FiChevronDown
              className="ml-1 -mr-1 h-4 w-4 text-neutral-400"
              aria-hidden="true"
            />
          )}
        </a>
      </Link>
    );
  };

  switch (navigationEntry.type) {
    case 'dropdown':
      return renderDropdownMenu(navigationEntry);
    default:
      return <li className="menu-item">{renderMainMenu(navigationEntry)}</li>;
  }
};
