import React, {PropTypes} from 'react';
import './ArticleContent.css';
import { content } from '../articles';

const ArticleContent = ({id}) => {
  const dangerWrap = html => ({__html: html});

  const html = content(id);

  return (
    <div dangerouslySetInnerHTML={dangerWrap(html)}/>
  );
};

ArticleContent.propTypes = {
  id: PropTypes.string.isRequired
};

export default ArticleContent;
