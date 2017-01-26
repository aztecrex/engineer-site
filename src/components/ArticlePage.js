import React from 'react';
import {connect} from 'react-redux';
import R from 'ramda';
import {actions} from '../model';

const ArticlePage = ({params, index, content, needContent}) => {

  const id = params.id;
  const entry = index[id];
  const digest = entry.digest;
  let article;
  if (digest in content)
    article = content[digest];
  else
    needContent(digest);
  return (
    <div>
      <p>{id} - {digest}</p>
      <p>{article || ""}</p>
    </div>
  );
};

const mapStateToProps = state => {
  const index = R.path(['articles','index'], state) || {};
  const content = R.path(['articles','content'], state) || {};
  return {index, content};
};

export default connect(mapStateToProps, actions)(ArticlePage);
