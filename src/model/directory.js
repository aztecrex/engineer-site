import R from 'ramda';

const newestFirst = (entry1,entry2) => {
  let d1 = new Date(entry1.published);
  let d2 = new Date(entry2.published);
  let comp = d1 > d2 ? -1 : (d2 > d1 ? 1 : 0);
  return comp;
};

const parsePublished = elem => R.assoc('published', new Date(elem.published), elem);

const prep = entries =>
  R.map(parsePublished, entries.concat().sort(newestFirst));

export default prep;
