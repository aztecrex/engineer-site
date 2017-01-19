import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import './App.css';
import { flipName } from './model';
import Articles from './components/ConnectedArticles'

// const articles = require.context('./articles',false,/\.md$/);

// const ArticleDisplay = html => {
//   const dangerWrap = () => ({__html: html});
//
//   return (
//     <div dangerouslySetInnerHTML={dangerWrap()}/>
//   );
// };

// const Article = ({name}) => ArticleDisplay(articles(name));

// const Articles = () => {
//
//   return (
//     <div>
//       {articles.keys().map(k => <Article key={k} name={k} />)}
//     </div>
//   );
// };

const UnconnectedHeader = ({name, flipName}) => {
  return (
    <p>
      You are in a app. Your name is{' '}
      <span className="clickable" onClick={flipName}>
          { name }
      </span>.
    </p>
  );
}

UnconnectedHeader.propTypes = {
  name: PropTypes.string.isRequired,
  flipName: PropTypes.func.isRequired
};

const Header = connect(state => state, {flipName: flipName})(UnconnectedHeader);

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

const App = () => {
  return(
    <div className="App">
      <Header />
      <Articles />
      <hr />
      <Footer />
    </div>
  );
};

export default App;
