// src/reducers/wordHistory.js

import { createSlice } from '@reduxjs/toolkit';

const wordHistorySlice = createSlice({
  name: 'wordHistory',
  initialState: {
    history: [],
  },
  reducers: {
    addWordToHistory: (state, action) => {
      state.history = [action.payload, ...state.history];
    },
  },
});

export const { addWordToHistory } = wordHistorySlice.actions;
export default wordHistorySlice.reducer;
