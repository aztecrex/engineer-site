import React from 'react';
import {connect} from 'react-redux';
import R from 'ramda';
import Markdown from './Markdown';
import {actions} from '../model';

const notLoaded = 1;
const notFound = 2;
const ok = 3;

const computeSource = (id, index, content) => {

  let source = null;
  let status = null;

  const digest = R.path([id,'digest'], index);
  if (digest) {
    const text = R.path([digest], content);
    if (text) {
      status = ok;
      source = text;
    } else {
      status = notLoaded;
    }
  } else {
    status = notFound;
  }

  return {source,status};
}

class Article extends React.Component {

  render() {
    const sourceInfo = computeSource (
      this.props.id,
      this.props.index,
      this.props.content
    );
    let source;
    switch(sourceInfo.status) {
      case ok:
        source = sourceInfo.source;
        break;
      case notFound:
        source = 'NOT FOUND';
        break;
      case notLoaded:
        this.props.needContent && this.props.needContent();
        source = 'LOADING';
        break;
    }
    return (
      <Markdown source={source} />
    );
  }

};

const mapStateToProps = (state) => {

  const index = R.path(['articles','index'],state) || {};
  const content = R.path(['articles','content'],state) || {};

  return {index, content};

};

const mappedActions = {
  needContent: actions.needContent
};

export default connect(mapStateToProps,mappedActions)(Article);
export {Article, mapStateToProps};
