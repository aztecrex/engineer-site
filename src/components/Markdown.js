import React from 'react';
import marked from 'marked';

export default class Markdown extends React.Component {

  render() {
    const dangerWrap = html => ({__html: html});


    if (this.props.source) {
      const html = marked(this.props.source);
      return (<div  className="article"
                    dangerouslySetInnerHTML={dangerWrap(html)}/>)
    } else
      return (<div className="article empty"/>);
  }
};
