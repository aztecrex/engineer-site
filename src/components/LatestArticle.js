import React from 'react';
import Article from './Article';

class LatestArticle extends React.Component {

  render() {
    return <Article id={this.props.id} />
  }

}

export {LatestArticle};
