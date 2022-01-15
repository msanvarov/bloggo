/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';

// TODO: use Next Image component for logo
export const Logo: React.FC = () => {
  return (
    <Link href="/">
      <a className="ttnc-logo inline-block text-primary-6000">
        <img src="https://ui-avatars.com/api/?name=Bloggo" alt="logo" />
      </a>
    </Link>
  );
};
