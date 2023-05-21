import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { testApi } from "./tests/testApi";
import persistReducer from "redux-persist/es/persistReducer";
import { authSlice } from "./auth/authSlice";
import { authApi } from "./auth/authApi";

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
    getDefaultMiddleware().concat([testApi.middleware, authApi.middleware]),
});
