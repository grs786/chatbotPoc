// src/sagas/index.ts
import {all} from 'redux-saga/effects';
import userSaga from './userSaga'


export default function* UserSaga() {
  yield all([
  userSaga(),
  ]);
}
