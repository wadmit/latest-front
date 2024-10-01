import { configureStore } from "@reduxjs/toolkit";
import { CustomSocket } from "@/config/socket";
import eligibilityReducer from "@/global-states/reducers/eligibilityReducer";
import userReducer from "@/global-states/reducers/userReducer";
import paymentReducer from "@/global-states/reducers/paymentReducer";
import additionalFormReducer from "@/global-states/reducers/additionalFormReducer";
import countryListReducer from "@/global-states/reducers/countryListReducer";
import applicationReducer from "@/global-states/reducers/applicationReducer";
import topMatchesReducer from "@/global-states/reducers/topMatchesReducer";
import currencyReducer from "@/global-states/reducers/currencyReducer";
import userApplicationDocumentsReducer from "@/global-states/reducers/userApplicationDocuments";
import wiseScoreReducer from "@/global-states/reducers/wisescore";
import universityCountryListReducer from "@/global-states/reducers/universityCountryReducer";
import socketSlice from "@/global-states/reducers/socketReducer";
import { thunk } from "redux-thunk";

export const socket = new CustomSocket();
// export const middlewares = [socketMiddleware(socket), thunk];
export const middlewares = [thunk];

export const makeStore = () => {
  return configureStore({
    reducer: {
      eligibility: eligibilityReducer,
      user: userReducer,
      payment: paymentReducer,
      additionalForm: additionalFormReducer,
      countryList: countryListReducer,
      applications: applicationReducer,
      topMatches: topMatchesReducer,
      currency: currencyReducer,
      applicationDocuments: userApplicationDocumentsReducer,
      wisescore: wiseScoreReducer,
      universityList: universityCountryListReducer,
      socket: socketSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(middlewares),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
