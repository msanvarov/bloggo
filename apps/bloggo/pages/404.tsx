import Head from 'next/head';
import React from 'react';

import { AppLayout, Button } from '@bloggo/ui';

const Page404: React.FC = () => {
  return (
    <>
      <Head>
        <title>404 || Bloggo</title>
      </Head>
      <AppLayout basicLayout>
        <div className="container relative py-16 lg:py-20">
          <header className="text-center max-w-2xl mx-auto space-y-7">
            <h2 className="text-7xl md:text-8xl">🪔</h2>
            <h1 className="text-8xl md:text-9xl font-semibold tracking-widest">
              404
            </h1>
            <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
              Whoops, the page you requested doesn&apos;t exists.{' '}
            </span>
            <Button primary href="/" className="mt-4">
              Go back to home page
            </Button>
          </header>
        </div>
      </AppLayout>
    </>
  );
};

export default Page404;
