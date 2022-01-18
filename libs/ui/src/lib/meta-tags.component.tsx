import Head from 'next/head';
import React from 'react';

type MetatagsProps = {
  title?: string;
  description?: string;
  image?: string;
};

export const Metatags: React.FC<MetatagsProps> = ({
  title = 'Bloggo - a blog platform for the modern web',
  description = 'A blog platform to write, publish, and share stories.',
  image = 'blob:https://vercel.com/c05fcf8a-4a1a-4ede-9a32-af71977cfb7c',
}) => {
  return (
    <Head>
      <title>{title} || Bloggo</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@fireship_dev" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
};
