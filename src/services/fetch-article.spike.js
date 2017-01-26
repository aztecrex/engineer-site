const fetchArticle = require('./fetch-article');

fetchArticle(
  // 'http://localhost:3000/articles/08f23f64bf369a75c76e3c59541aa9d5.md',
  '08f23f64bf369a75c76e3c59541aa9d5',
  (err, res) => {
  if (err) {
    console.log("error", err);
  } else {
    console.log("result", res);
  }
});


// /Users/aztecrex/Code/engineer-site/public/articles/08f23f64bf369a75c76e3c59541aa9d5.md
