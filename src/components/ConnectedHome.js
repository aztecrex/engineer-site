import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import './App.css';
import Article from './components/ConnectedArticle';

const Home = ({articleId}) => {
  return(
    <div className="App">
      <Article id={articleId} />
    </div>
  );
};

Home.propTypes = {
  articleId: PropTypes.string.isRequired
};

const mapState = state => {
  let articleId = state.homePageArticleId || "home";
  return {articleId};
};

export default connect(mapState)(Home);
