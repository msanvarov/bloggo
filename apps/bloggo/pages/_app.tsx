// external styling deps
import '@glidejs/glide/dist/css/glide.core.min.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Footer, Header } from '@bloggo/ui';

import '../styles/styles.scss';

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    // On router change
    window.scrollTo(0, 0);
  }, [router.asPath]);
  return (
    <>
      <Head>
        <title>Welcome to bloggo!</title>
      </Head>
      <main className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </main>
    </>
  );
};

export default CustomApp;
