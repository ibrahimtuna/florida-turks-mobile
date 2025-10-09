import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER } from '../types.ts';

type State = {
  accessToken: string;
  user: USER;
};

const initialState: State = {
  accessToken: '',
  user: {
    _id: '',
    email: '',
    name: '',
    surname: '',
    bio: '',
    phoneNumber: '',
    location: {
      addressId: '',
      coords: { coordinates: [0, 0] },
      displayName: '',
      formattedAddress: '',
    },
    photoKey: '',
    rewards: 0,
    shareContact: false,
    status: 0,
    createdAt: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    socialLogin: (
      state,
      action: PayloadAction<{ email: string; name: string }>,
    ) => {
      state.user.email = action.payload.email;
      state.user.name = action.payload.name.split(' ')[0];
      if (action.payload.name.split(' ')[1]) {
        state.user.surname = action.payload.name.split(' ')[1];
      }
    },
    setUser: (state, action: PayloadAction<USER>) => {
      state.user = action.payload;
    },
    logout: state => {
      state.accessToken = '';
      state.user = { ...initialState.user };
    },
  },
});

export const { login, socialLogin, setUser, logout } = userSlice.actions;

export default userSlice.reducer;
