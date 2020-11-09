import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import * as cs from "./csRedux";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  cs: cs.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
