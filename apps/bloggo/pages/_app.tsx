import '@glidejs/glide/dist/css/glide.core.min.css';
import 'moment-timezone';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store } from '@bloggo/redux';
import { persistor } from '@bloggo/redux';
import { Footer, Header, Loader } from '@bloggo/ui';

import '../styles/styles.scss';

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    // On router change
    window.scrollTo(0, 0);
  }, [router.asPath]);
  return (
    <Provider {...{ store }}>
      <PersistGate loading={<Loader />} {...{ persistor }}>
        <Head>
          <title>Welcome to bloggo!</title>
        </Head>
        <main className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
          <Header />
          <Component {...pageProps} />
          <Footer />
        </main>
      </PersistGate>
    </Provider>
  );
};

export default CustomApp;
