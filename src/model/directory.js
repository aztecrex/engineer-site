import R from 'ramda';

const latestFirst = (d1,d2) => d1 > d2 ? -1 : d2 > d1 ? 1 : 0;

const articleOrder =
  (entry1,entry2) => latestFirst(entry1.published,entry2.published);

const parsePublished = elem => R.assoc('published', new Date(elem.published), elem);

const prep = entries =>
  R.map(parsePublished, entries).sort(articleOrder);

export default prep;
