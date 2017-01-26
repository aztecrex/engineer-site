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
    const content = R.path([digest], content);
    if (!content)
      source = "LOADING";
    else {
      source = content;
    }
  }

  return source;
}

class Article extends React.Component {

  render() {
    const source = computeSource(
      props.id,
      props.index,
      props.content
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
