import classnames from 'classnames';
import React from 'react';
import { FiGithub } from 'react-icons/fi';

import { ISocialMedia } from './buttons/share-post-button-container-component';

type SocialsListProps = {
  className?: string;
  itemClass?: string;
  socials?: ISocialMedia[];
};

const appSocials: ISocialMedia[] = [
  { id: 'Github', name: 'Github', icon: <FiGithub />, href: '#' },
];

export const SocialMediaLinks: React.FC<SocialsListProps> = ({
  className,
  itemClass = 'block',
  socials = appSocials,
}) => {
  return (
    <nav
      className={classnames(
        'flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300',
        className,
      )}
    >
      {socials.map((item, i) => (
        <a
          key={i}
          className={classnames(itemClass)}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          {item.icon}
        </a>
      ))}
    </nav>
  );
};
