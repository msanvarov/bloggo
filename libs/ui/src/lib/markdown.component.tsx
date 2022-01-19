import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownProps = {
  content: string;
  className?: string;
};

export const Markdown: React.FC<MarkdownProps> = ({
  className = '',
  content,
}) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} className={className}>
      {content}
    </ReactMarkdown>
  );
};
