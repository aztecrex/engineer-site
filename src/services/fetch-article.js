// const R = require('ramda');

// const fetchArticleOld = (digest, cb) => {
//   let url = `/articles/${digest}.md`;
//
//   const checkResponse = response => {
//     if (response.status !== 200) {
//       const err = {
//         code: 'UNAVAILABLE',
//         errno: 'UNAVAILABLE',
//         status: response.status
//       };
//       throw err;
//     }
//     return response;
//   };
//
//   const extractBody = response => {
//     return response.text();
//   };
//
//   return fetch(url)
//     .then(checkResponse)
//     .then(extractBody);
// };


const fetchArticle = (digest, cb) => {
  const module = '!!html!markdown!../articles/a58391f18257e2ac765f41c8c82e149e.md';
  // eslint-disable-next-line import/no-webpack-loader-syntax
  const content = require('!!html!markdown!../articles/' + digest + '.md');
  // const content = require('!!html!markdown!../articles/a58391f18257e2ac765f41c8c82e149e.md');
  console.log(content);
  return Promise.resolve(content);
};


module.exports = exports =  fetchArticle;
