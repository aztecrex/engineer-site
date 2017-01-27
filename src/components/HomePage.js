import React from 'react';
import LatestArticle from './LatestArticle';
import Directory from './Directory';
import Harper from './Harper';

class HomePage extends React.Component {

  render() {
    return (
      <div className="page home">
        <LatestArticle />
        <hr />
        <Directory />
        <hr />
        <Harper />
      </div>
    );
  }
}


export default HomePage;
