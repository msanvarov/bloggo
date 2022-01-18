import { random } from 'lodash';
import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import Moment from 'react-moment';

import { IFirestoreUsernameData } from '@bloggo/redux';

import { Avatar } from '../avatar.component';
import { ImageContainer } from '../image';
import { Link } from '../link.component';

interface AuthorCardProps {
  className?: string;
  author: IFirestoreUsernameData;
}

// TODO: remove this
const backgroundImageOptions: string[] = [
  'https://images.pexels.com/photos/912410/pexels-photo-912410.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/7354542/pexels-photo-7354542.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/3651577/pexels-photo-3651577.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/4064835/pexels-photo-4064835.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/3330118/pexels-photo-3330118.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/4066850/pexels-photo-4066850.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/931887/pexels-photo-931887.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/7175377/pexels-photo-7175377.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/7663205/pexels-photo-7663205.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/973505/pexels-photo-973505.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
];

export const AuthorCard: React.FC<AuthorCardProps> = ({
  className = '',
  author,
}) => {
  const { username, createdAt } = author;

  const generateRandomBackgroundImage = () =>
    backgroundImageOptions[random(backgroundImageOptions.length - 1)];

  return (
    <Link
      href={`/${username}`}
      className={`flex flex-col overflow-hidden [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      colorClass=""
    >
      <div className="relative flex-shrink-0 ">
        <div>
          <ImageContainer
            containerClassName="flex aspect-w-7 aspect-h-5 sm:aspect-h-6 w-full h-0"
            src={generateRandomBackgroundImage()}
          />
        </div>
        <div className="absolute top-3 inset-x-3 flex">
          <div className=" py-1 px-4 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center leading-none text-xs font-medium">
            1 post <FiChevronRight className="w-5 h-5 text-yellow-600 ml-3" />
          </div>
        </div>
      </div>

      <div className="-mt-8 m-8 text-center">
        <Avatar
          containerClassName="ring-2 ring-white"
          sizeClass="w-16 h-16 text-2xl"
          radius="rounded-full"
          src={`https://ui-avatars.com/api/?name=${username}`}
          userName={username}
        />
        <div className="mt-3">
          <h2 className={`text-base font-medium`}>
            <span className="line-clamp-1">@{username}</span>
          </h2>
          <span
            className={`block mt-1 text-sm text-neutral-500 dark:text-neutral-400`}
          >
            Onboarded on <Moment format="ll">{createdAt}</Moment>
          </span>
        </div>
      </div>
    </Link>
  );
};
