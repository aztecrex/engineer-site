import React, {PropTypes} from 'react';
import './Articles.css';


const Article = ({id, name, date}) => {
  return (
    <li>
      <a href={"/articles/" + id}>
        {name}
      </a>
    </li>
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
        {articles.map(article => (<Article {...article} key={article.id} />))}
      </ul>
    </div>
  );
};

export default Articles;
