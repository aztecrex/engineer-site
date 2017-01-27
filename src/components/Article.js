import React from 'react';
import {connect} from 'react-redux';
import R from 'ramda';
import Markdown from './Markdown';
import {actions} from '../model';

class Article extends React.Component {

  render() {

    let source;
    if (this.props.content)
      source = this.props.content;
    else if (this.props.digest) {
      this.props.needContent && this.props.needContent(this.props.digest);
      source = 'LOADING';
    } else
      source = 'NOT FOUND';

    return (
      <Markdown source={source} />
    );
  }

};

const mapStateToProps = (state, own) => {

  const id = own && own.id;
  if (!id)
    return {};

  const digest = R.path(['articles','index',id,'digest'],state);
  if (!digest)
    return {};

  const content = R.path(['articles','content',digest],state);
  if (!content)
    return {digest};

  return {digest,content};

};

const mappedActions = {
  needContent: actions.needContent
};

export default connect(mapStateToProps,mappedActions)(Article);
export {Article, mapStateToProps};
