import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "./authCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  SetUser: "[Set User] Action",
};

const initialAuthState = {
  user: undefined,
  user_session: undefined,
};

export const reducer = persistReducer(
  { storage, key: "auth", whitelist: ["user", "user_session"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        
        return { user_session: action.payload, user: undefined };
      }

      case actionTypes.Register: {
        const { user_session } = action.payload;

        return { user_session, user: undefined };
      }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const user = action.payload.user.data;
        return { ...state, user };
      }

      case actionTypes.SetUser: {
        const { user } = action.payload;

        return { ...state, user };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (payload) => ({ type: actionTypes.Login, payload }),
  register: (user_session) => ({
    type: actionTypes.Register,
    payload: { user_session },
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: (user_session) => ({
    type: actionTypes.UserRequested,
    payload: user_session,
  }),
  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
  setUser: (user) => ({ type: actionTypes.SetUser, payload: { user } }),
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga({ payload }) {
    yield put(actions.requestUser(payload));
  });

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser());
  });

  yield takeLatest(actionTypes.UserRequested, function* userRequested({ payload }) {
    const { data: user } = yield getUserByToken(payload);

    yield put(actions.fulfillUser(user));
  });
}
