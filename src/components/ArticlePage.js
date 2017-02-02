import React from 'react';
import {connect} from 'react-redux';
import R from 'ramda';
import {Link} from 'react-router';
import Flexbox from 'flexbox-react';

import Revision from './Revision';
import Article from './Article';
import Directory from './Directory';
import Harper from './Harper';
class ArticlePage extends React.Component {

  render() {
    if (this.props.id) {
      return (
        <div className="page home">
          <Flexbox flexDirection="row">
            <Flexbox flexDirection="column" >

              <Flexbox element="header">
                <Link to="/">
                  <span id="title">Engineer Site</span>
                </Link>
              </Flexbox>
              <hr />
              <Flexbox flexGrow={1}>
                <Article id={this.props.id} />
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
            <Flexbox flex="0 0 20em">
              <Directory />
            </Flexbox>
          </Flexbox>
        </div>
      );
    } else {
      return <div className="not-found-page">Not Found</div>;
    }
  }

}

const mapStateToProps = (state, {params}) => {
  const id = params.id;
  if (!id)
    return {};
  else {
    const entry = R.path(['articles','index',[id]],state);
    if (!entry)
      return {id:null}
    else {
      const title = entry.title || "";
      return {id,title};
    }
  }
};

export default connect(mapStateToProps)(ArticlePage);
export {ArticlePage, mapStateToProps};
