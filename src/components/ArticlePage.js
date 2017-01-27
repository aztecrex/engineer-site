import React from 'react';
import {connect} from 'react-redux';
import R from 'ramda';
import Article from './Article';
import Directory from './Directory';
import Harper from './Harper';

class ArticlePage extends React.Component {

  render() {
    if (this.props.id) {
      return (
        <div className="page article">
          <Article id={this.props.id} />
          <hr />
          <Directory />
          <hr />
          <Harper />
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
