import Image from 'next/image';
import React from 'react';

type AvatarProps = {
  containerClassName?: string;
  sizeClass?: string;
  radius?: string;
  src?: string;
  userName?: string;
};

const avatarColors = [
  '#ffdd00',
  '#fbb034',
  '#ff4c4c',
  '#c1d82f',
  '#f48924',
  '#7ac143',
  '#30c39e',
  '#06BCAE',
  '#0695BC',
  '#037ef3',
  '#146eb4',
  '#8e43e7',
  '#ea1d5d',
  '#fc636b',
  '#ff6319',
  '#e01f3d',
  '#a0ac48',
  '#00d1b2',
  '#472f92',
  '#388ed1',
  '#a6192e',
  '#4a8594',
  '#7B9FAB',
  '#1393BD',
  '#5E13BD',
  '#E208A7',
];

export const Avatar: React.FC<AvatarProps> = ({
  containerClassName = 'ring-1 ring-white dark:ring-neutral-900',
  sizeClass = 'h-6 w-6 text-sm',
  radius = 'rounded-md',
  src,
  userName,
}) => {
  const url = src || '';
  const name = userName || 'Anonymous';
  const _setBgColor = (name: string) => {
    const backgroundIndex = Math.floor(
      name.charCodeAt(0) % avatarColors.length,
    );
    return avatarColors[backgroundIndex];
  };

  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
      style={{ backgroundColor: url ? undefined : _setBgColor(name) }}
    >
      {url && (
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          src={url}
          alt={name}
          layout="fill"
        />
      )}
      <span className="wil-avatar__name">{name[0]}</span>
    </div>
  );
};
