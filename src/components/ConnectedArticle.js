import { connect } from 'react-redux';
import Article from './Article';

const mapStateToProps = (state, {id}) => {
  let sources = state.sources || {};
  let source = sources[id];
  return {source};
};

export default connect(mapStateToProps)(Article);
