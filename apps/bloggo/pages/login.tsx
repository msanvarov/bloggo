import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

import { AppLayout, Button, Input, Link } from '@bloggo/ui';

const oauthProviders = [
  {
    name: 'Continue with Google',
    href: '#',
    icon: '/google.svg',
  },
];

const LoginPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Login || Bloggo</title>
      </Head>
      <AppLayout
        subHeading="Welcome to Bloggo"
        headingEmoji="🔑"
        heading="Login"
      >
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {oauthProviders.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                  width={24}
                  height={24}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <Link href="/forgot-password" className="text-sm">
                  Forgot password?
                </Link>
              </span>
              <Input type="password" className="mt-1" />
            </label>
            <Button primary type="submit">
              Continue
            </Button>
          </form>

          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Not part of Bloggo? {` `}
            <Link href="/register">Register with Bloggo</Link>
          </span>
        </div>
      </AppLayout>
    </>
  );
};

export default LoginPage;
