import React from 'react';
import {connect} from 'react-redux';
import R from 'ramda';

import Markdown from './Markdown';

const mapStateToProps = (state, {id}) => {

  let source;
  const digest = R.path(['articles','index',id,'digest'], state);
  if (!digest)
    source="NOT FOUND";
  else {
    const content = R.path(['articles','content',digest], state);
    if (!content)
      source = "LOADING";
    else {
      source = content;
    }
  }
  return {source};

};

export default connect(mapStateToProps)(Markdown);
