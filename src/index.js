import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './model';
import {Router, Route, browserHistory} from 'react-router';

import ReactGA from 'react-ga';

import HomePage from './components/HomePage';
import ArticlePage from './components/ArticlePage';

import './index.css';

browserHistory.listen(location => {
  setTimeout(() => {
    if (location.action === 'POP') {
      return;
    }
    window.scrollTo(0, 0);
  });
});

import {googleTrackingId} from '../secrets.js';
ReactGA.initialize(googleTrackingId);

function fireTracking() {
    const hostname = window.location.hostname;
    if (hostname !== "localhost") {
      ReactGA.pageview(window.location.pathname);
    }
}

const Root = () => (
    <Provider store={store}>
      <Router history={browserHistory} onUpdate={fireTracking}>
        <Route path="/" component={HomePage} />
        <Route path="/article/:id" component={ArticlePage} />
      </Router>
    </Provider>
  );

render(<Root />, document.getElementById('root'));
