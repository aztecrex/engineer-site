import React from 'react';
import configureMockStore from 'redux-mock-store';
const createMockStore = configureMockStore([]);
import ezJson from 'enzyme-to-json';
import ConnectedDirectory, {Directory, mapStateToProps} from './Directory';

describe('unconnected', () => {
  it('renders', () => {
    // given
    const entries = [
      {id:'one',
      title:'One'}
    ];
    // when
    const rendered = shallow(<Directory entries={entries} />);

    //then
    expect(ezJson(rendered)).toMatchSnapshot();
  });
});

describe('map state', () => {

  it('sorts entries intact', () => {
    //given
    const entries = [
      {title:'three', published: new Date('2016-05-01T13:45:22-0800')},
      {title:'one', published: new Date('2016-05-01T13:45:21.1Z')},
      {title:'two', published: new Date('2016-05-01T13:45:21.1-0800')},
      {title:'four', published: new Date('2016-12-04'), extra:"special"}
    ];
    const state = {articles:{directory:entries}};

    // when
    const actual = mapStateToProps(state);

    // then
    const expectedEntries = [
      {title:'four', published: new Date('2016-12-04'), extra:"special"},
      {title:'three', published: new Date('2016-05-01T13:45:22-0800')},
      {title:'two', published: new Date('2016-05-01T13:45:21.1-0800')},
      {title:'one', published: new Date('2016-05-01T13:45:21.1Z')}
    ];
    expect(actual).toEqual({entries:expectedEntries});

  });

});

describe('connected', () => {
  it('connects', () => {
    // given
    const entries = [
      {title:'three', published: new Date('2016-05-01T13:45:22-0800')},
      {title:'one', published: new Date('2016-05-01T13:45:21.1Z')},
      {title:'two', published: new Date('2016-05-01T13:45:21.1-0800')},
      {title:'four', published: new Date('2016-12-04')}
    ];
    const state = {articles:{directory:entries}};
    const store = createMockStore(state);

    // when
    const rendered = shallow(<ConnectedDirectory store={store}/>);

    // then
    expect(ezJson(rendered)).toMatchSnapshot();

  });
});
