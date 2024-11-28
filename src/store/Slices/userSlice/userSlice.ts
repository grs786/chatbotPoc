// /* eslint-disable no-unused-vars */
// /* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export type LoadingType = "idle" | "pending" | "resolved" | "rejected";

export type otpdata = {
  loading: LoadingType;
  posts: [];
  error: string | null;
};
const initialState: otpdata = {
  loading: "idle",
  posts: [],
  error: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    userRequest: {
      reducer: (state) => {
        state.loading = "pending";
      },
      prepare: (
        successCallback: (response: any) => void,
        failureCallback: (error: string) => void
      ) => ({
        payload: { successCallback, failureCallback },
      }),
    },
    userSuccess: (state, actions) => {
      state.loading = "resolved";
      state.posts = actions.payload;
    },
    userFailure: (state, actions) => {
      state.loading = "rejected";
      state.error = actions.payload;
      state.posts = [];
    },
  },
});

const { actions, reducer } = userSlice;

export const { userFailure,userRequest,userSuccess } = actions;

export default reducer;
