import React from 'react';
import {connect} from 'react-redux';
import R from 'ramda';
import Markdown from './Markdown';


const computeSource = (id, index, content) => {

  let source;

  const digest = R.path([id,'digest'], index);
  if (!digest)
    source="NOT FOUND";
  else {
    const loaded = R.path([digest], content);
    if (!loaded)
      source = "LOADING";
    else {
      source = loaded;
    }
  }

  return source;
}

class Article extends React.Component {

  render() {
    const source = computeSource(
      this.props.id,
      this.props.index,
      this.props.content
    );
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

export default connect(mapStateToProps)(Article);
export {Article, mapStateToProps};
