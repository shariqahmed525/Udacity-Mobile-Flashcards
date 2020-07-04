import reducers from '../reducers';
import { createStore } from 'redux';
import middleware from '../middleware';
const store = createStore(reducers, middleware);
export default store;