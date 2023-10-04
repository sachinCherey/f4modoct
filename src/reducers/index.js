// src/reducers/index.js

import { combineReducers } from 'redux';
import wordHistoryReducer from './wordHistory';

const rootReducer = combineReducers({
  wordHistory: wordHistoryReducer,
  // Add more reducers if needed
});

export default rootReducer;
