import {createStore, applyMiddleware, compose} from 'redux';

import reducer from './state/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware()));
window.__store__ = store;

export default store;