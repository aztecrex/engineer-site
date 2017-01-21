import directory from './directory.json';

const all = (() => {

  const latestFirst = (o1,o2) => {
    return o1.date > o2.date ? -1 : o1.date < o2.date ? 1 : 0;
  };

  let articles = [];
  for (let key in directory) {
    if ({}.hasOwnProperty.call(directory, key)) {
      let article = directory[key];
      articles.push(
        {
          ...article,
          id: key,
          date: new Date(Date.parse(article.date))
        });
    }
  }
  articles.sort(latestFirst);
})();

const latest = all[0];

const content = id => {
  let article = all.find(a => a.id === id);
  return require('./' + article.source);
};

export {all, latest, content};
