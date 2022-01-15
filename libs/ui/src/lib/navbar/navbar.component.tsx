import classNames from 'classnames';

import { DarkModeToggleContainer } from '../dark-mode-toggle';
import { Logo } from '../logo.component';
import { SearchDropdown } from '../search-dropdown.component';
import './navbar.module.scss';
import { Navigation } from './navigation.component';

/* eslint-disable-next-line */
export interface NavbarProps {
  isTopOfPage: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isTopOfPage }) => {
  return (
    <div
      className={classNames('.nc-MainNav', 'relative', 'z-10', {
        onTop: isTopOfPage,
        'notOnTop backdrop-filter': isTopOfPage,
      })}
    >
      <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-4 sm:space-x-10 2xl:space-x-14">
          <Logo />
          <Navigation />
        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden items-center xl:flex space-x-1">
            <DarkModeToggleContainer />
            <SearchDropdown />
            <div className="px-1" />
            {/* <ButtonPrimary href="/login">Sign up</ButtonPrimary> */}
          </div>
          <div className="flex items-center xl:hidden">{/* <MenuBar /> */}</div>
        </div>
      </div>
    </div>
  );
};
