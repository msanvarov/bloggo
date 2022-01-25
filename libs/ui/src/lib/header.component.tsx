import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import { Avatar } from './avatar.component';
import { BookmarkPostButton, LikePostButton } from './buttons';
import { SharePostButtonContainer } from './buttons/share-post-button-container-component';
import { Navbar } from './navbar/';

export const Header: React.FC = () => {
  const router = useRouter();
  const containerDivElRef = useRef<HTMLDivElement>(null);
  const mainMenuDivElRef = useRef<HTMLDivElement>(null);
  const progressBarDivElRef = useRef<HTMLDivElement>(null);
  const [previousScrollPosition, setPreviousScrollPosition] =
    useState<number>(0);

  // TODO: fix showSingleMenu check
  const showSingleMenu = router.asPath === '/:username/:slug';
  const [isSingleHeaderShowing, setIsSingleHeaderShowing] = useState(false);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);

  useEffect(() => {
    if (window.scrollY !== previousScrollPosition) {
      setPreviousScrollPosition(window.scrollY);
    }
  }, [previousScrollPosition]);

  useEffect(() => {
    window.onscroll = () => {
      if (mainMenuDivElRef.current) {
        showHideHeaderMenu(mainMenuDivElRef.current.offsetHeight);
      }
    };
  }, []);

  useEffect(() => {
    if (showSingleMenu) {
      setTimeout(() => {
        //  BECAUSE DIV HAVE TRANSITION 100ms
        window.addEventListener('scroll', showHideSingleHeader);
      }, 200);
    } else {
      window.removeEventListener('scroll', showHideSingleHeader);
    }
  }, [showSingleMenu]);

  const showHideHeaderMenu = (mainMenuHeight: number) => {
    const currentScrollPosition: number = window.pageYOffset;
    if (containerDivElRef.current && mainMenuDivElRef.current) {
      // SET BG
      if (previousScrollPosition < currentScrollPosition) {
        currentScrollPosition > mainMenuHeight
          ? setIsTopOfPage(false)
          : setIsTopOfPage(true);
      } else {
        currentScrollPosition > 0
          ? setIsTopOfPage(false)
          : setIsTopOfPage(true);
      }

      // SHOW _ HIDE MAIN MENU
      if (previousScrollPosition > currentScrollPosition) {
        containerDivElRef.current.style.top = '0';
      } else {
        containerDivElRef.current.style.top = `-${mainMenuHeight + 2}px`;
      }
      setPreviousScrollPosition(currentScrollPosition);
    }
  };

  const showHideSingleHeader = () => {
    handleProgressIndicator();
    // SHOW _ HIDE SINGLE DESC MENU
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > 600) {
      setIsSingleHeaderShowing(true);
    } else {
      setIsSingleHeaderShowing(false);
    }
  };
  const handleProgressIndicator = () => {
    const entryContent = document.querySelector(
      '#single-entry-content',
    ) as HTMLDivElement | null;

    if (!showSingleMenu || !entryContent) {
      return;
    }

    const totalEntryH = entryContent.offsetTop + entryContent.offsetHeight;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    let scrolled = (winScroll / totalEntryH) * 100;
    if (!progressBarDivElRef.current || scrolled > 140) {
      return;
    }

    scrolled = scrolled > 100 ? 100 : scrolled;

    progressBarDivElRef.current.style.width = scrolled + '%';
  };
  const renderSingleHeader = () => {
    if (!isSingleHeaderShowing) return null;

    return (
      <div className="dark relative py-4 bg-neutral-900 dark:bg-neutral-900">
        <div className="container">
          <div className="flex justify-end lg:justify-between">
            <div className="hidden lg:flex items-center mr-3">
              {/* <Avatar
                src={author.avatar}
                userName={author.displayName}
                sizeClass="w-8 h-8 text-lg"
                radius="rounded-full"
              /> */}
              <h3 className="ml-4 text-lg line-clamp-1 text-neutral-100">
                Placeholder title
              </h3>
            </div>

            <div className="flex items-center space-x-2 text-neutral-800 sm:space-x-3 dark:text-neutral-100">
              {/* <LikePostButton likes={12} postRef={} />
              <BookmarkPostButton
                initBookmarked={bookmark.isBookmarked}
                postId={id}
              /> */}
              <div className="border-l border-neutral-300 dark:border-neutral-700 h-6"></div>
              <SharePostButtonContainer
                className="flex space-x-2"
                itemClass="w-8 h-8 bg-neutral-100 text-lg dark:bg-neutral-800 dark:text-neutral-300"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-full left-0 w-full progress-container h-[5px] bg-neutral-300 overflow-hidden">
          <div
            ref={progressBarDivElRef}
            className="progress-bar h-[5px] w-0 bg-teal-600"
          />
        </div>
      </div>
    );
  };
  return (
    <header
      className="nc-will-change-top sticky top-0 w-full left-0 right-0 z-40 transition-all"
      ref={containerDivElRef}
    >
      <div ref={mainMenuDivElRef}>
        <Navbar {...{ isTopOfPage }} />
      </div>
      {showSingleMenu && renderSingleHeader()}
    </header>
  );
};
