import { Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiX,
  FiXCircle,
} from 'react-icons/fi';

export type ToastProps = {
  isOpen: boolean;
  toggle: () => void;
  text: {
    heading: string;
    body: string;
  };
  type?: 'success' | 'error' | 'info' | 'warning';
};

export const Toast: React.FC<ToastProps> = ({
  isOpen,
  toggle,
  text: { heading, body },
  type = 'info',
}) => {
  const getToastIcon = (type: 'success' | 'error' | 'info' | 'warning') => {
    switch (type) {
      case 'success':
        return (
          <FiCheckCircle
            className="h-6 w-6 text-green-400"
            aria-hidden="true"
          />
        );
      case 'error':
        return (
          <FiXCircle className="h-6 w-6 text-red-400" aria-hidden="true" />
        );
      case 'info':
        return <FiInfo className="h-6 w-6 text-blue-400" aria-hidden="true" />;
      case 'warning':
        return (
          <FiAlertCircle
            className="h-6 w-6 text-orange-400"
            aria-hidden="true"
          />
        );
    }
  };
  return (
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
    >
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={isOpen}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">{getToastIcon(type)}</div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{heading}</p>
                  <p className="mt-1 text-sm text-gray-500">{body}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={toggle}
                  >
                    <span className="sr-only">Close</span>
                    <FiX className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};
