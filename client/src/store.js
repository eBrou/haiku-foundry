import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import * as reducers from './js/reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers.mainReducer, composeEnhancers(applyMiddleware(thunk)));

export default store
