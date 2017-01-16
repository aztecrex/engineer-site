import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import './App.css';
import { flipName } from './model';

const articles = require.context('./articles',false,/\.md$/);

const ArticleDisplay = html => {
  const dangerWrap = () => ({__html: html});

  return (
    <div dangerouslySetInnerHTML={dangerWrap()}/>
  );
};

const Article = ({name}) => ArticleDisplay(articles(name));

const Articles = () => {

  return (
    <div>
      {articles.keys().map(k => <Article key={k} name={k} />)}
    </div>
  );
};

const App = ({name, flipName}) => {
  return(
    <div className="App">
      <p>
        You are in a app. Your name is{' '}
        <span onClick={flipName}>
            { name }
        </span>.
      </p>
      <Articles />
    </div>
  );
};

App.propTypes = {
  name: PropTypes.string.isRequired,
  flipName: PropTypes.func.isRequired
};

const mapStateToProps = state => state;
const mapDispatchToProps = {flipName: flipName};

export default connect(mapStateToProps, mapDispatchToProps)(App);
