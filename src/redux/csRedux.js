import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeEvery, call } from "redux-saga/effects";

export const actionTypes = {
  SetRoom: "[CS] SetRoom",
  SetLastViewStamp: "[CS] SetLastViewStamp",
  StoreLastViewStamp: "[CS] StoreLastViewStamp"
};

const initialState = {
  id: undefined,
  lastViewStamp: {}
};

export const reducer = persistReducer(
  { storage, key: "customer-sup", whitelist: ["id", "lastViewStamp"] },
  (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SetRoom: {
        return { ...state, id: action.payload };
      }
      case actionTypes.StoreLastViewStamp: {
        return { ...state, lastViewStamp: {...state.lastViewStamp, [action.payload.pid]: action.payload.timestamp} }
      }
      default:
        return state;
    }
  }
);

export const actions = {
  setRoom: (id) => ({ type: actionTypes.SetRoom, payload: id }),
  setLastViewStamp: (pid) => ({ type: actionTypes.SetLastViewStamp, payload: {pid} }),
  storeLastViewStamp: (pid, timestamp) => ({ type: actionTypes.StoreLastViewStamp, payload: {pid, timestamp} })
};

export function* saga() {
  yield takeEvery(actionTypes.SetLastViewStamp, fetchLVR)
}

function* fetchLVR(action) {
  const now = yield call(Date.now);
  yield put(actions.storeLastViewStamp(action.payload.pid, now));
}