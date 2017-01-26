import React from 'react';
import {connect} from 'react-redux';
import R from 'ramda';

const ArticlePage = ({params, index}) => {

  const id = params.id;
  const entry = index[id];
  const digest = entry.digest;

  return (<div><p>{id} - {digest}</p></div>)
};

const mapStateToProps = state => {
  const index = R.path(['articles','index'], state) || {};
  return {index};
};

export default connect(mapStateToProps)(ArticlePage);
