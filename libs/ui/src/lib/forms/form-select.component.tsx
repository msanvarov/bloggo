import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import React, { SelectHTMLAttributes, useState } from 'react';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  sizeClass?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  className = '',
  sizeClass = 'h-11',
  children,
  ...rest
}) => {
  return (
    <select
      className={`${sizeClass} ${className} block w-full text-sm rounded-lg border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900`}
      {...rest}
    >
      {children}
    </select>
  );
};
