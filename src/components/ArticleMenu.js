import React from 'react';
import {Link} from 'react-router';
import R from 'ramda';

class ArticleMenu extends React.Component {

  keyedMenuItem(entry) {
    return (
      <li className="article-menu-item" key={entry.id}>
        <Link to={"/article/" + entry.id}>
          {entry.title}
        </Link>
      </li>
    );
  }

  render() {
    const entries = this.props.entries || [];
    return (
      <ul className="article-menu">
        {R.map(this.keyedMenuItem, entries)}
      </ul>
    );
  }
}

export default ArticleMenu;
