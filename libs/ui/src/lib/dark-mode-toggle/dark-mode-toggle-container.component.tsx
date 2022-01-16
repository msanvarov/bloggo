import React, { useEffect } from 'react';

import {
  AppState,
  toggleDarkMode,
  useAppDispatch,
  useAppSelector,
} from '@bloggo/redux';

import { DarkModeSwitch } from './dark-mode-switch.component';

type DarkModeToggleContainerProps = {
  className?: string;
};

export const DarkModeToggleContainer: React.FC<
  DarkModeToggleContainerProps
> = ({ className }) => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state: AppState) => state.layout.darkMode);
  useEffect(() => {
    const root = document.querySelector('html');
    if (!root) return;
    if (darkMode) {
      !root.classList.contains('dark') && root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkModeOnClick = () => {
    dispatch(toggleDarkMode());
  };
  return (
    <DarkModeSwitch
      {...{
        className,
        isDarkMode: darkMode,
        onClick: toggleDarkModeOnClick,
      }}
    />
  );
};
