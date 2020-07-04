import decks from './decks';
import { combineReducers } from 'redux';

const reducers = combineReducers({
  reducer: decks,
});

export default reducers;