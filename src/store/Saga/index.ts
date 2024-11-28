// src/sagas/index.ts
import {all} from 'redux-saga/effects';
import UserSaga from './user';

export default function* root() {
  yield all([UserSaga()]);
}
