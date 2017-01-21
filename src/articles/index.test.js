import proxyquire from 'proxyquire';

const directory = {
  one: {
    name: "Article One",
    date: "2017-01-01T15:00-0800",
    source:"article-one.md"
  },
  two: {
    name: "Article Two",
    date: "2017-01-02T15:00-0800",
    source:"article-two.md"
  },
  three: {
    name: "Article Three",
    date: "2017-01-03T15:00-0800",
    source:"article-three.md"
  }
};

const {all} = proxyquire('./index', {
  './directory.json': directory
});



it('orders all the articles', () => {
  expect(all[0].id).toBe("three");
});
