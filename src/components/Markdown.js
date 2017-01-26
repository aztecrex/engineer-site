import React from 'react';
import marked from 'marked';
export default ({content}) => {
  const dangerWrap = html => ({__html: html});


  if (content) {
    const html = marked(content);
    return (<div  className="article" 
                  dangerouslySetInnerHTML={dangerWrap(html)}/>)
  } else
    return (<div className="article empty"/>);
};
