import React, {PropTypes} from 'react';
import './Article.css';

const article = source => require('../articles/' + source);

// require.context('../articles',false,/\.md$/);

const content = html => {
  const dangerWrap = () => ({__html: html});

  return (
    <div dangerouslySetInnerHTML={dangerWrap()}/>
  );
};

const Article = ({source}) => {
  return content(article(source));
};

Article.propTypes = {
  source: PropTypes.string.isRequired
};

export default Article;
