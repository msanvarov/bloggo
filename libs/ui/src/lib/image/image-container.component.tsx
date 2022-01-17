import React, { ImgHTMLAttributes, useEffect, useRef, useState } from 'react';

import { AppState, useAppSelector } from '@bloggo/redux';

import checkInViewIntersectionObserver from './image-inview-port.util';
import placeholderImageLargeDarkHPng from './placeholders/placeholder-large-dark-h.png';
import placeholderImageLargeDarkPng from './placeholders/placeholder-large-dark.png';
import placeholderImageLargeHPng from './placeholders/placeholder-large-h.png';
import placeholderImageLargePng from './placeholders/placeholder-large.png';

interface ImageContainerProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  prevImageHorizontal?: boolean;
}

type StaticImageData = {
  src: string;
  height: number;
  width: number;
  placeholder?: string;
};

export const ImageContainer: React.FC<ImageContainerProps> = ({
  containerClassName = '',
  alt = 'nc-imgs',
  src = '',
  prevImageHorizontal = false,
  className = 'object-cover w-full h-full',
  ...rest
}) => {
  const { darkMode } = useAppSelector((state: AppState) => state.layout);
  let isMounted = false;
  const containerDivElRef = useRef<HTMLDivElement>(null);
  let imageEl: HTMLImageElement | null = null;
  const placeholderImage = darkMode
    ? prevImageHorizontal
      ? placeholderImageLargeDarkHPng
      : placeholderImageLargeDarkPng
    : prevImageHorizontal
    ? placeholderImageLargeHPng
    : placeholderImageLargePng;

  const [__src, set__src] = useState<string | StaticImageData>(
    placeholderImage,
  );
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const _initActions = async () => {
    set__src(placeholderImage);
    _checkInViewPort();
  };

  const _checkInViewPort = () => {
    if (!containerDivElRef.current) return;
    checkInViewIntersectionObserver({
      target: containerDivElRef.current as any,
      distanceFromEnd: 0,
      callback: _imageOnViewPort,
    });
  };

  const _imageOnViewPort = () => {
    if (!src) {
      _handleImageLoaded();
      return true;
    }
    imageEl = new Image();
    if (imageEl) {
      imageEl.src = src;
      imageEl.addEventListener('load', _handleImageLoaded);
    }
    return true;
  };

  const _handleImageLoaded = () => {
    if (!isMounted) return;
    setImageLoaded(true);
    set__src(src);
  };

  useEffect(() => {
    isMounted = true;
    _initActions();
    return () => {
      isMounted = false;
    };
  }, [src]);

  useEffect(() => {
    if (!imageLoaded) {
      set__src(placeholderImage);
    }
  }, [darkMode]);

  return (
    <div className={containerClassName} ref={containerDivElRef}>
      {__src ? (
        <img
          src={typeof __src === 'string' ? __src : __src.src}
          className={className}
          alt={alt}
          {...rest}
        />
      ) : (
        <div
          className={`${className} bg-neutral-200 dark:bg-neutral-6000`}
        ></div>
      )}
    </div>
  );
};
