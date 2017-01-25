import React from 'react';
import {shallow, render} from 'enzyme';
import Normalizer from 'html-normalizer';
const normalizer = new Normalizer();

import Article from './Article';

describe('render article', () => {

  it('renders as a div', () => {

    // given
    let article = (<Article />);

    // when
    let wrapper = shallow(article);

    // then
    expect(wrapper.is('div')).toBe(true);

  });

  it('renders the provided html', () =>  {

    // given
    let content =   "<p id='itsme'>pretty nice paragraph</p>"
                  + "\n<hr><p class='purple'>what is next</p>";
    let article = (<Article content={content} />);

    // when
    let wrapper = render(article);

    // then
    let expected = normalizer.normalize(content);

    let inner = wrapper.find('#itsme');
    let actual = normalizer.normalize(inner.parent().html());

    expect(actual).toEqual(expected);


  });

});
