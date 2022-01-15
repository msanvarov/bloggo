import React, { useEffect, useState } from 'react';

import { DarkModeSwitch } from './dark-mode-switch.component';

type DarkModeToggleContainerProps = {
  className?: string;
};

export const DarkModeToggleContainer: React.FC<
  DarkModeToggleContainerProps
> = ({ className }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  useEffect(() => {
    const root = document.querySelector('html');
    if (!root) return;
    if (darkMode) {
      !root.classList.contains('dark') && root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <DarkModeSwitch
      {...{
        className,
        isDarkMode: darkMode,
        onClick: toggleDarkMode,
      }}
    />
  );
};
