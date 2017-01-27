import React from 'react';
import R from 'ramda';
import {connect} from 'react-redux';
import Article from './Article';

class LatestArticle extends React.Component {

  render() {
    return <Article id={this.props.id} />
  }

}

const later = (e1,e2) => {
  return e2.published > e1.published ? e2 : e1;
};

const mapStateToProps = state => {
  const entries = R.path(['articles','directory'], state) || [];

  let id;
  if (entries.length == 0)
    id = null;
  else {
    id = R.reduce(later, R.head(entries), R.tail(entries)).id;
  }
  return {id};

};

export default connect(mapStateToProps)(LatestArticle);
export {LatestArticle, mapStateToProps};
