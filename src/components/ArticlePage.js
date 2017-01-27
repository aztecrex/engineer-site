import React from 'react';
import {connect} from 'react-redux';
import R from 'ramda';
import Article from './Article';
import Harper from './Harper';

class ArticlePage extends React.Component {

  render() {
    return (
      <div className="article-page">
        <h1>{this.props.title}</h1>
        <Article id={this.props.id} />
        <hr />
        <Harper />
      </div>
    );
  }

}

const mapStateToProps = (state, {params}) => {
  const id = params.id;
  const entry = R.path(['articles','index',[id]],state);
  if (!entry)
    return {id:null}
  else {
    const title = entry.title || "";
    return {id,title};
  }
};

export default connect(mapStateToProps)(ArticlePage);
export {ArticlePage, mapStateToProps};
