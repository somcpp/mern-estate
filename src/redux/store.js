import { combineReducers, configureStore } from "@reduxjs/toolkit";
localStorage
import userReducer from "./auth/authSlice";
import listReducer from "./List/listSlice"
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers(
  { 
    user: userReducer,
    list: listReducer
  }
);

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);