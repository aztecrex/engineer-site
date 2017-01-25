import React from 'react';

const Article = ({content}) => {
  const dangerWrap = html => ({__html: html});

  return (
    <div dangerouslySetInnerHTML={dangerWrap(content)}/>
  );
};

export default Article;
