import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL, responseHandler, errorHandler } from "../utils";
import { login } from "../slice/auth-slice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL + "users/" }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "",
      transformResponse: responseHandler,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(login(data.data.user));
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetUserQuery } = userApi;
