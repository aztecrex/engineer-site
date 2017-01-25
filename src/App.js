import React from 'react';
// import React, {PropTypes} from 'react';
// import { connect } from 'react-redux';

import './App.css';

import ArticleMenu from './components/ArticleMenu';
import Article from './components/Article';
import Harper from './components/Harper';
// import { flipName } from './model';
// import ArticleList from './components/ConnectedArticleList';
// import Article from './components/ConnectedArticle';

// const Header = () => {
//   return (
//     <h1>An Engineer's Site</h1>
//   );
// }

// const UnconnectedFooter = ({name, flipName}) => {
//   return (
//     <div>
//       <p>
//         Generated from React + Redux + Markdown {' '}
//         <a href="https://github.com/aztecrex/engineer-site">
//           source
//         </a>
//         .
//       </p>
//       <p>
//         You are in a app. Your name is{' '}
//         <span className="clickable" onClick={flipName}>
//             { name }
//         </span>.
//       </p>
//     </div>
//   );
// };

// UnconnectedFooter.propTypes = {
//   name: PropTypes.string.isRequired,
//   flipName: PropTypes.func.isRequired
// };

// const mapStateToFooterProps = state => ({name: state.name});

// const Footer = connect(mapStateToFooterProps, {flipName: flipName})(UnconnectedFooter);


const App = () => {
  return(
    <div className="App">
      <ArticleMenu />
      <hr />
      <Article  content="<p>this is content</p><p>and this is, too</p>"/>
      <hr />
      <Harper />
    </div>
  );
};

export default App;
