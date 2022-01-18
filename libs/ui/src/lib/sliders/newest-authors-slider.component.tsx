import Glide from '@glidejs/glide';
import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';

import { IFirestoreUsernameData } from '@bloggo/redux';

import NextPrevButtons from '../buttons/next-prev-buttons.component';
import { AuthorCard } from '../cards/author-card.component';
import { SectionHeading } from '../section-heading.component';

type NewestAuthorsSliderProps = {
  className?: string;
  heading: string;
  subHeading: string;
  authors: IFirestoreUsernameData[];
};

export const NewestAuthorsSlider: React.FC<NewestAuthorsSliderProps> = ({
  heading,
  subHeading,
  className = '',
  authors,
}) => {
  const GLIDE_SELECTOR_CLASS = 'glide_' + nanoid();
  useEffect(() => {
    setTimeout(() => {
      new Glide(`.${GLIDE_SELECTOR_CLASS}`, {
        perView: 5,
        gap: 32,
        bound: true,
        breakpoints: {
          1280: {
            perView: 4,
          },
          1023: {
            gap: 24,
            perView: 3,
          },
          767: {
            gap: 20,
            perView: 2,
          },
          639: {
            gap: 20,
            perView: 2,
          },
          500: {
            gap: 20,
            perView: 1,
          },
        },
      }).mount();
    }, 100);
  }, []);
  return (
    <div className={className}>
      <div className={GLIDE_SELECTOR_CLASS}>
        <SectionHeading isCenter desc={subHeading}>
          {heading}
        </SectionHeading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {authors.map((item, index) => (
              <li key={index} className="glide__slide pb-12 md:pb-16">
                <AuthorCard author={item} />
              </li>
            ))}
          </ul>
        </div>
        <NextPrevButtons
          btnClassName="w-12 h-12"
          containerClassName="justify-center"
        />
      </div>
    </div>
  );
};
