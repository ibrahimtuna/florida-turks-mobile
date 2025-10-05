import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CATEGORY_ITEM, FEED } from '../types.ts';

type State = {
  categories: CATEGORY_ITEM[];
  feed: FEED[];
};

const initialState: State = {
  categories: [],
  feed: [],
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeedCategories: (state, action: PayloadAction<CATEGORY_ITEM[]>) => {
      state.categories = action.payload;
    },
    setFeed: (state, action: PayloadAction<FEED[]>) => {
      state.feed = action.payload;
    },
  },
});

export const { setFeedCategories, setFeed } = feedSlice.actions;

export default feedSlice.reducer;
