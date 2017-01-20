import { connect } from 'react-redux';
import ArticleList from './ArticleList';


const mapStateToProps = state => {
  let articles = state.articles || [];
  return {articles};
};

export default connect(mapStateToProps)(ArticleList);
