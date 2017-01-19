import React, {PropTypes} from 'react';
import './Articles.css';


const Article = ({id, name, date}) => {
  return (
    <a href={"/articles/" + id}>
      {date.toString()} - {name}
    </a>
  );
};

Article.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired
};

const Articles = ({articles}) => {
  return (
    <div>
      <ul>
        {articles.map(article => (<li key={article.id}>{Article(article)}</li>))}
      </ul>
    </div>
  );
};

export default Articles;
