import {combineReducers} from '@reduxjs/toolkit';
import {UserReducer} from './userSlice';

export const RootReducer = combineReducers({
  userReducer:UserReducer,
});
