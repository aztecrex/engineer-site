import React from 'react';
import ArticleMenu from './ArticleMenu';
import R from 'ramda';

class Directory extends React.Component {

  render() {
    return (
      <div className="directory">
        <ArticleMenu directory={this.props.entries} />
      </div>
    );
  }

}

const latestFirst =
  R.comparator((entry1,entry2) => entry1.published > entry2.published);

const mapStateToProps =
  state => (
    {
      directory: (R.path(['articles','directory'],state) || [])
          .concat()
          .sort(latestFirst)
    }
  );

export {Directory, mapStateToProps};
