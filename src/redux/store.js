import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { testApi } from "./tests/testApi";
import persistReducer from "redux-persist/es/persistReducer";
import { authSlice } from "./auth/authSlice";
import { authApi } from "./auth/authApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import persistStore from "redux-persist/es/persistStore";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const userPersistConfig = {
  key: "user",
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(userPersistConfig, authSlice.reducer),
    [testApi.reducerPath]: testApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([testApi.middleware, authApi.middleware]),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
