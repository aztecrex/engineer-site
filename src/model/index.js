import createStore from 'react-redux';

import { reduce } from './reducer';
import { flipName } from './action';

const store = createStore(reduce);

const actions = { flipName };

export { actions, store };
