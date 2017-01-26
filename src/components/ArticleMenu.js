import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import R from 'ramda';

const MenuItem = ({title, id}) => {
  return (
  <li>
    <Link to={"article/" + id}>
      {title}
    </Link>
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
