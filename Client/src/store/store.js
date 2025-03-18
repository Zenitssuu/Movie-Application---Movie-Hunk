import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserSliceReducer from "./UserSlice";
import ThemeSliceReducer from "./ThemeSlice";
import locationReducer from "./LocationSlice.js";
import movieReducer from "./MovieSlices.js";
import OtpSliceReducer from "./OTPVerify";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import { getDefaultMiddleware } from '@reduxjs/toolkit';

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const rootReducers = combineReducers({
  user: UserSliceReducer,
  theme: ThemeSliceReducer,
  otp: OtpSliceReducer,
  locationReducer,
  movieReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
