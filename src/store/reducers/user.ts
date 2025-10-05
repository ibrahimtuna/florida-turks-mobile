import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  _id: string;
  email: string;
  name: string;
  surname: string;
  bio: string;
  phoneNumber: string;
  location: string;
  photoKey: string;
  rewards: number;
  shareContact: boolean;
  status: 0 | 1 | 2;
  createdAt: string;
};

type State = {
  accessToken: string;
  user: User;
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
    location: '',
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
    setUser: (state, action: PayloadAction<User>) => {
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
