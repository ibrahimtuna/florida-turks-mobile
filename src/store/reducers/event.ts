import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CATEGORY_ITEM, EVENT, EVENT_PARTICIPANT } from '../types.ts';

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
    addEvent: (state, action: PayloadAction<EVENT>) => {
      state.events.push(action.payload);
    },
    joinEvent: (
      state,
      action: PayloadAction<{
        eventId: string;
        participant: EVENT_PARTICIPANT;
      }>,
    ) => {
      const { eventId, participant } = action.payload;
      const event = state.events.find(e => e._id === eventId);
      if (!event) return;
      event.participants.push(participant);
    },
    withdrawEvent: (
      state,
      action: PayloadAction<{
        eventId: string;
        userId: string;
      }>,
    ) => {
      const { eventId, userId } = action.payload;
      const event = state.events.find(e => e._id === eventId);
      if (!event) return;
      event.participants = event.participants.filter(
        item => item._id !== userId,
      );
    },
  },
});

export const {
  setEventCategories,
  setEvents,
  addEvent,
  joinEvent,
  withdrawEvent,
} = eventSlice.actions;

export default eventSlice.reducer;
