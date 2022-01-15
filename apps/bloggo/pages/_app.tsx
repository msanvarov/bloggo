// external styling deps
import '@glidejs/glide/dist/css/glide.core.min.css';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { Header } from '@bloggo/ui';

import '../styles/styles.scss';

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Welcome to bloggo!</title>
      </Head>
      <main className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <Header />
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default CustomApp;
