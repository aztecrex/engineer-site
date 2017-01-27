import React from 'react';
import ArticleMenu from './ArticleMenu';
import R from 'ramda';
import {connect} from 'react-redux';


class Directory extends React.Component {

  render() {
    return (
      <div className="directory">
        <ArticleMenu entries={this.props.entries} />
      </div>
    );
  }

}

const latestFirst =
  R.comparator((entry1,entry2) => entry1.published > entry2.published);

const mapStateToProps =
  state => (
    {
      entries: (R.path(['articles','directory'],state) || [])
          .concat()
          .sort(latestFirst)
    }
  );

export default connect(mapStateToProps)(Directory);
export {Directory, mapStateToProps};
