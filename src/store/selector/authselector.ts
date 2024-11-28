// selectors/authSelectors.ts

import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store'; // Assuming your root state is defined in a file called 'store'

// Define a selector function to retrieve user info from the state
export const selectUserInfo = (state: RootState) =>
  state.userReducer.userReducer.posts;

// Use createSelector to memoize the selector function
export const selectUserInfoMemoized = createSelector(
  selectUserInfo,
  userInfo => userInfo, // Modify this according to your actual state structure
);
