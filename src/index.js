import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './model';
import {Router, Route, browserHistory} from 'react-router';

import HomePage from './components/HomePage';
import ArticlePage from './components/ArticlePage';

import './index.css';



const Root = () => (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={HomePage} />
        <Route path="/article/:id" component={ArticlePage} />
      </Router>
    </Provider>
  );

render(<Root />, document.getElementById('root'));
