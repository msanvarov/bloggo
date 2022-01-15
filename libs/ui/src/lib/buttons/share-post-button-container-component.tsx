import React from 'react';
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';

type SharePostButtonContainerProps = {
  className?: string;
  itemClass?: string;
};

export interface ISocialMedia {
  id: string;
  name: string;
  icon: JSX.Element;
  href: string;
}

const socials: ISocialMedia[] = [
  { id: 'Facebook', name: 'Facebook', icon: <FiFacebook />, href: '#' },
  { id: 'Twitter', name: 'Twitter', icon: <FiTwitter />, href: '#' },
  { id: 'Linkedin', name: 'Linkedin', icon: <FiLinkedin />, href: '#' },
  { id: 'Instagram', name: 'Instagram', icon: <FiInstagram />, href: '#' },
];
export const SharePostButtonContainer: React.FC<
  SharePostButtonContainerProps
> = ({
  className = 'grid gap-[6px]',
  itemClass = 'w-7 h-7 text-base hover:bg-neutral-100',
}) => {
  return (
    <div className={`nc-SocialsShare ${className}`} data-nc-id="SocialsShare">
      {socials.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded-full leading-none flex items-center justify-center bg-white text-neutral-6000 ${itemClass}`}
          title={`Share on ${item.name}`}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};
