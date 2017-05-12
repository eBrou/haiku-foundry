import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as reducers from './js/reducers/index';

export default createStore(reducers.mainReducer, applyMiddleware(thunk));
