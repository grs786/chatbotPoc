import { call, put, takeLatest, SagaReturnType } from "redux-saga/effects";
import {
  userFailure,
  userRequest,
  userSuccess,
} from "../../Slices/userSlice/userSlice";
import { fetchPosts } from "src/services/userApi";

type userResponse = SagaReturnType<typeof fetchPosts>;

interface userAction {
  type: string;
  payload: {
    successCallback?: () => void;
    failureCallback?: (error: string) => void;
  };
}

function* userSaga(action: userAction): Generator<any, void> {
  try {
    const data: userResponse = yield call(fetchPosts);
    if (data && !data.error) {
      yield put(userSuccess(data));
      action.payload?.successCallback?.();
    } else {
      throw new Error("Error in API");
    }
  } catch (error: any) {
    yield put(userFailure(error.message));
    action.payload?.failureCallback?.(error?.message);
  }
}

function* rootSaga(): Generator<any, void, void> {
  yield takeLatest(userRequest.type, userSaga);
}

export default rootSaga;
