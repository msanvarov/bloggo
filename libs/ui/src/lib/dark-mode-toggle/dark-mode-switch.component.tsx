import classNames from 'classnames';
import React from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

type DarkModeSwitchProps = {
  className?: string;
  isDarkMode: boolean;
  onClick: () => void;
};

export const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({
  className,
  isDarkMode,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center',
        className,
      )}
    >
      <span className="sr-only">Enable dark mode</span>
      {isDarkMode ? (
        <FiSun className="w-7 h-7" aria-hidden="true" />
      ) : (
        <FiMoon className="w-7 h-7" aria-hidden="true" />
      )}
    </button>
  );
};
