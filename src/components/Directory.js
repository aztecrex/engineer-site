import React from 'react';
import ArticleMenu from './ArticleMenu';

class Directory extends React.Component {

  render() {
    return (
      <div className="directory">
        <ArticleMenu directory={this.props.entries} />
      </div>
    );
  }

}

export {Directory};
