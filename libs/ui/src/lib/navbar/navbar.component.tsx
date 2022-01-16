import classNames from 'classnames';
import { useRouter } from 'next/router';

import { AppState, logout, useAppSelector } from '@bloggo/redux';

import { Button } from '../buttons';
import { CreatePost } from '../create-post.component';
import { DarkModeToggleContainer } from '../dark-mode-toggle';
import { Logo } from '../logo.component';
import { MenuBar } from '../menu-bar.component';
import { SearchDropdown } from '../search-dropdown.component';
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
      className={classNames('main-nav', 'relative', 'z-10', {
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
                <CreatePost
                  onClick={() => {
                    console.log('Clicked create post');
                  }}
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
