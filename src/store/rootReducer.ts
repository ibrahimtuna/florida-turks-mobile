import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import feedReducer from './reducers/feed';
import eventReducer from './reducers/event';
import companyReducer from './reducers/company';

const rootReducer = combineReducers({
  user: userReducer,
  feed: feedReducer,
  event: eventReducer,
  company: companyReducer,
});

export default rootReducer;
