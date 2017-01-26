import React from 'react';
// import React, {PropTypes} from 'react';
// import { connect } from 'react-redux';

import './App.css';

import ArticleMenu from './components/ArticleMenu';
import Article from './components/Article';
import Harper from './components/Harper';

const App = () => {
  return(
    <div className="App">
      <ArticleMenu />
      <hr />
      <Article  content="<p>this is content</p><p>and this is, too</p>"/>
      <hr />
      <p>
        You are in a app. Your name is <Harper />.
      </p>
    </div>
  );
};

export default App;
