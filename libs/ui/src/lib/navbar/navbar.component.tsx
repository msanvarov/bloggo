import classnames from 'classnames';
import { useRouter } from 'next/router';
import { FiPenTool, FiSettings } from 'react-icons/fi';

import { AppState, logout, useAppSelector } from '@bloggo/redux';

import { Button } from '../buttons';
import { DarkModeToggleContainer } from '../dark-mode-toggle';
import { Logo } from '../logo.component';
import { MenuBar } from '../menu-bar.component';
import { SearchDropdown } from '../search-dropdown.component';
import { NavbarActionButton } from './navbar-action-button.component';
import './navbar.module.scss';
import { Navigation } from './navigation.component';

/* eslint-disable-next-line */
export interface NavbarProps {
  isTopOfPage: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isTopOfPage }) => {
  const router = useRouter();
  const { user } = useAppSelector((state: AppState) => state.user);
  return (
    <div
      className={classnames('main-nav', 'relative', 'z-10', {
        onTop: isTopOfPage,
        'not-on-top backdrop-filter': isTopOfPage,
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
            {user ? (
              <>
                <NavbarActionButton
                  href="/portal/create-post"
                  icon={<FiPenTool className="w-7 h-7" aria-hidden="true" />}
                />
                <NavbarActionButton
                  href="/portal/edit-profile"
                  icon={<FiSettings className="w-7 h-7" aria-hidden="true" />}
                />
                <div className="px-1">
                  <Button
                    primary
                    onClick={() => {
                      logout();
                      router.reload();
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="px-1">
                <Button primary href="/login">
                  Login
                </Button>
              </div>
            )}
          </div>
          <div className="flex items-center xl:hidden">
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};
