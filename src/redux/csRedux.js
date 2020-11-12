import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeEvery, call } from "redux-saga/effects";
import { timestamp } from "../services/firebaseInit"

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
        return { id: action.payload };
      }
      case actionTypes.StoreLastViewStamp: {
        return { ...state.lastViewStamp, [action.payload.uid]: action.payload.timestamp }
      }
      default:
        return state;
    }
  }
);

export const actions = {
  setRoom: (id) => ({ type: actionTypes.SetRoom, payload: id }),
  setLastViewStamp: (uid) => ({ type: actionTypes.SetLastViewStamp, payload: uid }),
  storeLastViewStamp: (uid, timestamp) => ({ type: actionTypes.StoreLastViewStamp, payload: {uid, timestamp} })
};

export function* saga() {
  yield takeEvery(actionTypes.SetLastViewStamp, fetchLVR)
}

function* fetchLVR(action) {
  const now = yield call(timestamp);
  yield put(actions.storeLastViewStamp(action.payload, now));
}