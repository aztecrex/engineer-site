import React from 'react';
import LatestArticle from './LatestArticle';
import Directory from './Directory';
import Harper from './Harper';
import Revision from './Revision';
class HomePage extends React.Component {

  render() {
    return (
      <div className="page home">
        <Directory />
        <hr />
        <LatestArticle />
        <hr />
        <Directory />
        <hr />
        <Harper />
        <hr />
        <div>
          <p>
            Revision <Revision />
          </p>
        </div>
      </div>
    );
  }
}


export default HomePage;
