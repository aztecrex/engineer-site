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

const Footer = () => {
  return (
    <div>
      <p>
        Generated from React + Redux + Markdown {' '}
        <a href="https://github.com/aztecrex/engineer-site">
          source
        </a>
        .
      </p>
    </div>
  );
};

const App = ({name, flipName}) => {
  return(
    <div className="App">
      <p>
        You are in a app. Your name is{' '}
        <span className="clickable" onClick={flipName}>
            { name }
        </span>.
      </p>
      <Articles />
      <hr />
      <Footer />
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
