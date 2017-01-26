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

  // Fetch.fetchUrl(url, (err, meta, body) => {
  //   if (err)
  //     cb(err);
  //   else {
  //     if (meta.status != 200) {
  //       cb({
  //         code: 'UNAVAILABLE',
  //         errno: 'UNAVAILABLE',
  //         meta: meta
  //       });
  //     } else
  //       cb(null, body.toString());
  //   }
  // });
};

module.exports = exports =  fetchArticle;
