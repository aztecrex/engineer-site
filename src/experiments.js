import React from 'react';
import { renderToString } from 'react-dom/server';
import HomePage from './components/HomePage';
import {store} from './model';
import {Provider} from 'react-redux';
// import Markdown from './components/Markdown';
//
// const model = <Markdown source="# Title\nbody of the article" />;
//
// const out = renderToString(model);


// import {reduce} from './model';

// const out = reduce();

const home = <Provider store={store}><HomePage /></Provider>;

const out = renderToString(home);

console.log(out);
