import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL, responseHandler, errorHandler } from "../utils";
import { login, logout } from "../slice/auth-slice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL + "auth/" }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      transformResponse: responseHandler,
      transformErrorResponse: errorHandler,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(login(data.data.user));
      },
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
      transformResponse: responseHandler,
      transformErrorResponse: errorHandler,
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      transformResponse: responseHandler,
      transformErrorResponse: errorHandler,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(logout());
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
