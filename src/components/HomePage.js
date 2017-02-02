import React from 'react';
import Flexbox from 'flexbox-react';
import LatestArticle from './LatestArticle';
import Directory from './Directory';
import Harper from './Harper';
import Revision from './Revision';
class HomePage extends React.Component {

  render() {
    return (
      <div className="page home">
        <Flexbox flexDirection="row">
          <Flexbox flexDirection="column" >

            <Flexbox element="header">
              <span id="title">Engineer Site</span>
            </Flexbox>
            <hr />
            <Flexbox flexGrow={1}>
              <LatestArticle />
            </Flexbox>

            <hr />

            <Flexbox element="footer">
              <Harper />
              <hr />
              <div>
                <p>
                  Revision <Revision />
                </p>
              </div>
            </Flexbox>
          </Flexbox>
          <Flexbox width="50em">
            <Directory />
          </Flexbox>
        </Flexbox>
      </div>
    );
  }
}


export default HomePage;
