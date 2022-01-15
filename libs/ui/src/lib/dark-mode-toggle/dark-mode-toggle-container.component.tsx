import React, { useEffect, useState } from 'react';

import { DarkModeSwitch } from './dark-mode-switch.component';

export const DarkModeToggleContainer = () => {
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
        className: undefined,
        isDarkMode: darkMode,
        onClick: toggleDarkMode,
      }}
    />
  );
};
