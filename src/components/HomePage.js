import React from 'react';
import ArticleMenu from './ArticleMenu';
import Harper from './Harper';


class HomePage extends React.Component {

  render() {
    return (
      <div>
        <ArticleMenu />
        <hr />
        <Harper />
      </div>
    );
  }
}


export default HomePage;
