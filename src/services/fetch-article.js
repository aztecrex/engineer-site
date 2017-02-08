// const R = require('ramda');

const fetchArticle = (digest, cb) => {
  let url = `/articles/${digest}.md`;

  const checkResponse = response => {
    if (response.status !== 200) {
      const err = {
        code: 'UNAVAILABLE',
        errno: 'UNAVAILABLE',
        status: response.status
      };
      throw err;
    }
    return response;
  };

  const extractBody = response => {
    return response.text();
  };

  return fetch(url)
    .then(checkResponse)
    .then(extractBody);

};

module.exports = exports =  fetchArticle;
