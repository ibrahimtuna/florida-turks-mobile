import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CATEGORY_ITEM, EVENT } from '../types.ts';

type State = {
  categories: CATEGORY_ITEM[];
  events: EVENT[];
};

const initialState: State = {
  categories: [],
  events: [],
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEventCategories: (state, action: PayloadAction<CATEGORY_ITEM[]>) => {
      state.categories = action.payload;
    },
    setEvents: (state, action: PayloadAction<EVENT[]>) => {
      state.events = action.payload;
    },
  },
});

export const { setEventCategories, setEvents } = eventSlice.actions;

export default eventSlice.reducer;
