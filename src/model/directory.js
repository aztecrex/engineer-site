

const newestFirst = (entry1,entry2) => {
  let d1 = new Date(entry1.published);
  let d2 = new Date(entry2.published);
  let comp = d1 > d2 ? -1 : (d2 > d1 ? 1 : 0);
  return comp;
};

export default entries => entries.concat().sort(newestFirst);
