import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INBOX, MESSAGE } from '../types.ts';

type State = {
  inbox: INBOX[];
};

const initialState: State = {
  inbox: [],
};

export const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    setInbox: (state, action: PayloadAction<INBOX[]>) => {
      state.inbox = action.payload;
    },
    addMessage: (
      state,
      action: PayloadAction<{ userId: string; message: MESSAGE }>,
    ) => {
      const { userId, message } = action.payload;
      const conversation = state.inbox.find(item => item.userId === userId);
      if (!conversation) return;
      conversation.messages.push(message);
    },
  },
});

export const { setInbox, addMessage } = inboxSlice.actions;

export default inboxSlice.reducer;
