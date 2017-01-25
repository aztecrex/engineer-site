import React from 'react';
import {connect} from 'react-redux';
import R from 'ramda';

const MenuItem = ({title, id}) => {
  return (
  <li>
    <a href={"article/" + id}>
      {title}
    </a>
  </li>);
};

const keyedMenuItem =
  article => (<MenuItem {...article} key={article.id} />);

const ArticleMenu = ({directory}) => {

  return (
    <ul>
      {R.map(keyedMenuItem, directory || [])}
    </ul>
  );
};

const mapStateToProps = state => {
  let directory = R.path(['articles','directory'], state) || [];
  return {directory};
};

export default connect(mapStateToProps)(ArticleMenu);
