import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';

import { MobileNavbar } from './navbar/mobile-navbar.component';

export const MenuBar: React.FC = () => {
  const router = useRouter();
  const [showMenuBar, setShowMenuBar] = useState<boolean>(false);
  //   Hide menu bar on route change
  useEffect(() => {
    setShowMenuBar(false);
  }, [router.asPath]);

  const handleOpenMenu = () => setShowMenuBar(true);
  const handleCloseMenu = () => setShowMenuBar(false);

  return (
    <>
      <button
        onClick={handleOpenMenu}
        className="p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <Transition appear show={showMenuBar} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={handleCloseMenu}
        >
          <div className="fixed left-0 top-0 bottom-0 w-full md:w-auto z-max outline-none focus:outline-none">
            <Transition.Child
              as={Fragment}
              enter="transition duration-100 transform"
              enterFrom="opacity-0 -translate-x-14"
              enterTo="opacity-100 translate-x-0"
              leave="transition duration-150 transform"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 -translate-x-14"
            >
              <div className="z-10 relative">
                <MobileNavbar {...{ onClose: handleCloseMenu }} />
              </div>
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter=" duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave=" duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50" />
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
