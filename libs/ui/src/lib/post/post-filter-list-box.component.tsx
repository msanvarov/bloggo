import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { FiCheck, FiChevronDown } from 'react-icons/fi';

import { Button } from '../buttons';

// TODO: move this to a better place
const FILTERS = [
  { id: 0, name: 'Most Recent' },
  { id: 1, name: 'Most Liked' },
  { id: 2, name: 'Most Discussed' },
  { id: 3, name: 'Most Viewed' },
];

export const PostFilterListBox: React.FC = () => {
  const [selected, setSelected] = useState(FILTERS[0]);
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative md:min-w-[200px]">
        <Listbox.Button as="div">
          <Button
            className="text-neutral-700 border border-neutral-200 dark:text-neutral-200 dark:border-neutral-700"
            sizeClass="px-4 py-2 sm:py-2.5"
            fontSize="text-sm"
            translate="hover:border-neutral-300 w-full justify-between"
          >
            {selected.name}
            <FiChevronDown
              className="w-4 h-4 ml-2 -mr-1 opacity-70"
              aria-hidden="true"
            />
          </Button>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute right-0 z-20 w-52 py-1 mt-1 overflow-auto text-sm text-neutral-900 dark:text-neutral-200 bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 dark:ring-neutral-700">
            {FILTERS.map((item, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `${
                    active
                      ? 'text-primary-700 dark:text-neutral-200 bg-primary-50 dark:bg-neutral-700'
                      : ''
                  } cursor-default select-none relative py-2 pl-10 pr-4`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`${
                        selected ? 'font-medium' : 'font-normal'
                      } block truncate`}
                    >
                      {item.name}
                    </span>
                    {selected ? (
                      <span className="text-primary-700 absolute inset-y-0 left-0 flex items-center pl-3 dark:text-neutral-200">
                        <FiCheck className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
