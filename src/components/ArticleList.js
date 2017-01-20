import React, {PropTypes} from 'react';
import './ArticleList.css';


const ArticleEntry = ({id, name, date}) => {

  const formatDate = d => {
    return d.toLocaleDateString()
  };

  return (
    <li>
      <a href={"/articles/" + id}>
        {name}
      </a>
      {' - '}
      {formatDate(date)}
    </li>
  );
};

ArticleEntry.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired
};

const ArticleList = ({articles}) => {
  return (
    <div>
      <ul>
        {articles.map(article =>
          (<ArticleEntry {...article} key={article.id} />))}
      </ul>
    </div>
  );
};

export default ArticleList;
