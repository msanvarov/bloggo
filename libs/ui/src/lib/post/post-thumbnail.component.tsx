import React from 'react';

import { ImageContainer } from '../image';

type PostThumbnailProps = {
  className?: string;
  media: {
    type: 'image' | 'video' | 'audio' | 'gallery';
    src: string;
  };
};

export const PostThumbnail: React.FC<PostThumbnailProps> = ({
  className = 'w-full h-full',
  media,
}) => {
  return (
    <div className={`nc-PostFeaturedMedia relative ${className}`}>
      <ImageContainer containerClassName="absolute inset-0" src={media.src} />
    </div>
  );
};
