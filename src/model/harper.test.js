import {reduce, flipName} from './harper';

it('has initial state of "Harper"', () => {
  // when
  let actual = reduce();

  // then
  expect(actual).toEqual("Harper");
});

it('should reverse the name', () => {

  // when
  let initial = reduce();
  let actual = reduce(initial, flipName());

  // then
  expect(actual).toEqual("repraH");

});

it('should re-reverse the name', () => {

  // when
  let initial = reduce(reduce(), flipName());
  let actual = reduce(initial, flipName());

  // then
  expect(actual).toEqual("Harper");

});
