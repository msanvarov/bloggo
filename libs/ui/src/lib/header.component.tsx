import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import { Avatar } from './avatar.component';
import { BookmarkPostButton, LikePostButton } from './buttons';
import { SharePostButtonContainer } from './buttons/share-post-button-container-component';
import { Navbar } from './navbar/';

// TODO: remove mock data
const SINGLE = {
  id: 'eae0212192f63287e0c212',
  featuredImage:
    'https://images.unsplash.com/photo-1605487903301-a1dff2e6bbbe?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1957&q=80',
  title: 'Quiet ingenuity: 120,000 lunches and counting',
  desc: 'We’re an online magazine dedicated to covering the best in international product design. We started as a little blog back in 2002 covering student work and over time',
  date: 'May 20, 2021',
  href: '/single/this-is-single-slug',
  commentCount: 14,
  viewdCount: 2378,
  readingTime: 6,
  bookmark: {
    count: 3502,
    isBookmarked: false,
  },
  like: {
    count: 773,
    isLiked: true,
  },
  author: {
    id: 10,
    firstName: 'Mimi',
    lastName: 'Fones',
    displayName: 'Fones Mimi',
    email: 'mfones9@canalblog.com',
    avatar: '',
    count: 38,
    href: '/author/the-demo-author-slug',
    desc: 'There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.',
    jobName: 'Author Job',
  },
  categories: [
    {
      id: 1,
      name: 'Garden',
      href: '/archive/the-demo-archive-slug',
      thumbnail:
        'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGdhcmRlbmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
      count: 13,
      color: 'pink',
      taxonomy: 'category',
    },
    {
      id: 2,
      name: 'Jewelry',
      href: '/archive/the-demo-archive-slug',
      thumbnail:
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fGpld2Vscnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60',
      count: 16,
      color: 'red',
      taxonomy: 'category',
    },
  ],
  postType: 'standard',
  tags: [
    {
      id: 1,
      name: 'Garden',
      href: '/archive/the-demo-archive-slug',
      thumbnail:
        'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=550&q=80',
      count: 13,
      color: 'indigo',
      taxonomy: 'tag',
    },
    {
      id: 2,
      name: 'Jewelry',
      href: '/archive/the-demo-archive-slug',
      thumbnail:
        'https://images.unsplash.com/photo-1485841890310-6a055c88698a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=550&q=80',
      count: 16,
      color: 'red',
      taxonomy: 'tag',
    },
    {
      id: 4,
      name: 'Tools',
      href: '/archive/the-demo-archive-slug',
      thumbnail:
        'https://images.unsplash.com/photo-1491406213019-05b162a72c20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
      count: 21,
      color: 'pink',
      taxonomy: 'tag',
    },
  ],
  content: '',
  comments: [
    {
      id: 1,
      author: {
        id: 8,
        firstName: 'Claudetta',
        lastName: 'Sleite',
        displayName: 'Sleite Claudetta',
        email: 'csleite7@godaddy.com',
        gender: 'Genderqueer',
        count: 35,
        href: '/author/the-demo-author-slug',
        desc: 'There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.',
        jobName: 'Author Job',
        bgImage:
          'https://images.pexels.com/photos/7175377/pexels-photo-7175377.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      date: 'May 20, 2021',
      content:
        'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.',
      parentId: null,
      like: {
        count: 96,
        isLiked: false,
      },
      childrens: null,
      children: [
        {
          id: 4,
          author: {
            id: 1,
            firstName: 'Alric',
            lastName: 'Truelock',
            displayName: 'Truelock Alric',
            email: 'atruelock0@skype.com',
            gender: 'Bigender',
            bgImage:
              'https://images.pexels.com/photos/912410/pexels-photo-912410.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
            count: 40,
            href: '/author/the-demo-author-slug',
            desc: 'There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.',
            jobName: 'Author Job',
          },
          date: 'May 20, 2021',
          content:
            'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.',
          parentId: 1,
          like: {
            count: 45,
            isLiked: true,
          },
          childrens: null,
          children: [
            {
              id: 10,
              author: {
                id: 9,
                firstName: 'Vern',
                lastName: 'Pillifant',
                displayName: 'Pillifant Vern',
                email: 'vpillifant8@bravesites.com',
                gender: 'Male',
                count: 21,
                href: '/author/the-demo-author-slug',
                desc: 'There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.',
                jobName: 'Author Job',
                bgImage:
                  'https://images.pexels.com/photos/7663205/pexels-photo-7663205.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
              },
              date: 'May 20, 2021',
              content:
                'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
              parentId: 4,
              like: {
                count: 56,
                isLiked: false,
              },
              childrens: null,
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 6,
      author: {
        id: 10,
        firstName: 'Mimi',
        lastName: 'Fones',
        displayName: 'Fones Mimi',
        email: 'mfones9@canalblog.com',
        gender: 'Agender',
        count: 111,
        href: '/author/the-demo-author-slug',
        desc: 'There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.',
        jobName: 'Author Job',
        bgImage:
          'https://images.pexels.com/photos/973505/pexels-photo-973505.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      date: 'May 20, 2021',
      content:
        'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.',
      parentId: null,
      like: {
        count: 45,
        isLiked: false,
      },
      childrens: null,
      children: [],
    },
    {
      id: 7,
      author: {
        id: 4,
        firstName: 'Agnes',
        lastName: 'Falconar',
        displayName: 'Falconar Agnes',
        email: 'afalconar3@google.ru',
        gender: 'Non-binary',
        count: 36,
        href: '/author/the-demo-author-slug',
        desc: 'There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.',
        jobName: 'Author Job',
        bgImage:
          'https://images.pexels.com/photos/4064835/pexels-photo-4064835.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      date: 'May 20, 2021',
      content:
        'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.',
      parentId: null,
      like: {
        count: 30,
        isLiked: true,
      },
      childrens: null,
      children: [
        {
          id: 3,
          author: {
            id: 7,
            firstName: 'Sergei',
            lastName: 'Royal',
            displayName: 'Royal Sergei',
            email: 'sroyal6@netlog.com',
            gender: 'Non-binary',
            count: 102,
            href: '/author/the-demo-author-slug',
            desc: 'There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.',
            jobName: 'Author Job',
            bgImage:
              'https://images.pexels.com/photos/931887/pexels-photo-931887.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          },
          date: 'May 20, 2021',
          content:
            'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
          parentId: 7,
          like: {
            count: 66,
            isLiked: true,
          },
          childrens: null,
          children: [
            {
              id: 9,
              author: {
                id: 1,
                firstName: 'Alric',
                lastName: 'Truelock',
                displayName: 'Truelock Alric',
                email: 'atruelock0@skype.com',
                gender: 'Bigender',
                bgImage:
                  'https://images.pexels.com/photos/912410/pexels-photo-912410.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                count: 40,
                href: '/author/the-demo-author-slug',
                desc: 'There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.',
                jobName: 'Author Job',
              },
              date: 'May 20, 2021',
              content:
                'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
              parentId: 3,
              like: {
                count: 95,
                isLiked: false,
              },
              childrens: null,
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 8,
      author: {
        id: 3,
        firstName: 'Nathanil',
        lastName: 'Foulcher',
        displayName: 'Foulcher Nathanil',
        email: 'nfoulcher2@google.com.br',
        gender: 'Bigender',
        count: 43,
        href: '/author/the-demo-author-slug',
        desc: 'There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.',
        jobName: 'Author Job',
        bgImage:
          'https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      },
      date: 'May 20, 2021',
      content:
        'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
      parentId: null,
      like: {
        count: 100,
        isLiked: false,
      },
      childrens: null,
      children: [],
    },
  ],
};

export const Header: React.FC = () => {
  const router = useRouter();
  const containerDivElRef = useRef<HTMLDivElement>(null);
  const mainMenuDivElRef = useRef<HTMLDivElement>(null);
  const progressBarDivElRef = useRef<HTMLDivElement>(null);
  const [previousScrollPosition, setPreviousScrollPosition] =
    useState<number>(0);

  // TODO: fix showSingleMenu check
  const showSingleMenu = router.asPath === '/single/:slug';
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
    // TODO: fetch blog data from firebase and populate this field
    const { title, author, id, bookmark } = SINGLE;
    return (
      <div className="nc-SingleHeaderMenu dark relative py-4 bg-neutral-900 dark:bg-neutral-900">
        <div className="container">
          <div className="flex justify-end lg:justify-between">
            <div className="hidden lg:flex items-center mr-3">
              <Avatar
                src={author.avatar}
                userName={author.displayName}
                sizeClass="w-8 h-8 text-lg"
                radius="rounded-full"
              />
              <h3 className="ml-4 text-lg line-clamp-1 text-neutral-100">
                {title}
              </h3>
            </div>

            <div className="flex items-center space-x-2 text-neutral-800 sm:space-x-3 dark:text-neutral-100">
              <LikePostButton postId={SINGLE.id} like={SINGLE.like} />
              <BookmarkPostButton
                initBookmarked={bookmark.isBookmarked}
                postId={id}
              />
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
      className="nc-Header nc-will-change-top sticky top-0 w-full left-0 right-0 z-40 transition-all"
      ref={containerDivElRef}
    >
      <div ref={mainMenuDivElRef}>
        <Navbar {...{ isTopOfPage }} />
      </div>
      {showSingleMenu && renderSingleHeader()}
    </header>
  );
};
