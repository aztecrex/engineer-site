import { connect } from 'react-redux';
import Articles from './Articles';


const mapStateToProps = state => {
  let articles = state.articles || [];
  return {articles};
};

export default connect(mapStateToProps)(Articles);
