import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Markdown } from '../markdown.component';

type PostContentProps = {
  content: string;
};

// TODO: Add disquis for comments

export const PostContent: React.FC<PostContentProps> = ({ content }) => {
  return (
    <div className="space-y-10">
      <div
        id="single-entry-content"
        className="prose prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
      >
        <Markdown {...{ content }} />
      </div>
      {/* POST TAGS */}
      {/* AUTHOR DATA */}
      {/* COMMENT SECTION */}
    </div>
  );
};
