import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const UserReducer = combineReducers({
  userReducer: userReducer,
});
