import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth-slice";
import productSlice from "./slice/product-slice";
import { authApi } from "./api/auth-api";
import { productApi } from "./api/product-api";
import { userApi } from "./api/user-api";
import collectionApi from "./api/collection-api";
import brandApi from "./api/brand-api";
import sidebarSlice from "./slice/sidebar-slice";
import menuApi from "./api/menu-api";

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.reducerPath]: authSlice.reducer,
      [productSlice.reducerPath]: productSlice.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [productApi.reducerPath]: productApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [collectionApi.reducerPath]: collectionApi.reducer,
      [brandApi.reducerPath]: brandApi.reducer,
      [sidebarSlice.reducerPath]: sidebarSlice.reducer,
      [menuApi.reducerPath]: menuApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(productApi.middleware)
        .concat(userApi.middleware)
        .concat(collectionApi.middleware)
        .concat(brandApi.middleware)
        .concat(menuApi.middleware);
    },
  });

export default makeStore;

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
