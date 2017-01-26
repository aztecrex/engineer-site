import React from 'react';
import marked from 'marked';

export default ({source}) => {
  const dangerWrap = html => ({__html: html});


  if (source) {
    const html = marked(source);
    return (<div  className="article"
                  dangerouslySetInnerHTML={dangerWrap(html)}/>)
  } else
    return (<div className="article empty"/>);
};
