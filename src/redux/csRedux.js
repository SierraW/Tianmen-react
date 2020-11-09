import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  SetRoom: "[CS] SetRoom",

};

const initialAuthState = {
  id: undefined,
};

export const reducer = persistReducer(
  { storage, key: "customer-sup", whitelist: ["id"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.SetRoom: {
        console.log("setting room",action.payload);
        return { id: action.payload };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  setRoom: (id) => ({ type: actionTypes.SetRoom, payload: id }),
};
